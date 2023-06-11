const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bp = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

const db = new Client({
  host: "ep-white-cake-586152.ap-southeast-1.aws.neon.tech",
  user: "JeffriUI",
  database: "j10league",
  password: "8YTEQzCOrc5m",
  port: 5432,
  sslmode: "require",
  ssl: true,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database", err);
    return;
  }
  console.log("Database connected");
});

app.get("/upcomingMatches", (req, res) => {
  db.query(
    `SELECT 
      t.tournament_code, 
      t.tournament_name, 
      t.scope, 
      m.match_code, 
      m.team_1_code, 
      m.team_2_code, 
      m.match_stage, 
      m.round_count, 
      m.match_date
    FROM 
      tournaments t
    JOIN 
      match_info m ON t.tournament_code = m.tournament_code
    WHERE m.match_status = 'Upcoming';
    `,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      res.json(result.rows);
    }
  );
});

app.get("/resultsMatches", (req, res) => {
  db.query(
    `SELECT 
      t.tournament_code, 
      t.tournament_name, 
      t.tournament_status,
      t.scope,  
      m.match_code, 
      m.team_1_code, 
      m.team_2_code,
      m.match_winner,
      m.team_1_score, 
      m.team_2_score
    FROM 
      tournaments t
    JOIN 
      match_info m ON t.tournament_code = m.tournament_code
    WHERE m.match_status = 'Completed';
    `,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      res.json(result.rows);
    }
  );
});

app.post('/RegisterAdmin', async (req, res) => {
  const { username, pass } = req.body;

  try {
    // Check if the username already exists in the database
    const query = 'SELECT * FROM admin WHERE username = $1';
    const result = await db.query(query, [username]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password using bcrypt
    console.log(pass);
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Insert the admin information into the database
    const insertQuery = 'INSERT INTO admin (username, pass) VALUES ($1, $2)';
    await db.query(insertQuery, [username, hashedPassword]);

    res.status(200).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Failed to register admin' });
  }
});

app.post("/LoginAdmin", async (req, res) => {
  const { username, pass } = req.body;
  
  db.query(
    `SELECT * FROM admin WHERE username = '${username}'`,
    async (err, result) => {
      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      const storedData = result.rows[0];
      const passwordMatch = await bcrypt.compare(pass, storedData.pass.trim());

      if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        // Password does not match
        console.log(storedData);
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  );
});

app.get("/teams", (req, res) => {
  db.query(
    `SELECT * FROM teams`,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      res.json(result.rows);
    }
  );
});

app.post('/InsertTeam', (req, res) => {
  const code = req.body.code
  const name = req.body.name
  db.query(
    `INSERT INTO teams VALUES ('${code}', '${name}');`,
    (err) => {
      if (err) {
        console.error("Error executing query", err);
        return
      }
      res.send("Team data inserted successfully.")
    }
  );
});

//first, get the team_code from teams table, needed for member_id generation
async function getTeamCode(req, res, next) {
  const getTeamQuery = `SELECT * FROM teams WHERE team_name = '${req.body.team_name}';`

  let getTeamResult = await db.query(getTeamQuery)
  if(getTeamResult.err){
    console.error("Error executing query", getTeamResult.err);
    return
  }
  req.team_code = getTeamResult.rows[0].team_code

  next()
}

//next, count the existing member in a team, to decide the number on member_id
async function getMemberCount(req, res, next) {
  const memberCountQuery = `SELECT COUNT(member_code) FROM team_info WHERE team_code = '${req.team_code}';`

  let memberCountResult = await db.query(memberCountQuery)
  if(memberCountResult.err){
    console.error("Error executing query", memberCountResult.err);
    return
  }
  let member_count = memberCountResult.rows[0].count
  req.member_code = req.team_code + "_" + (++member_count)

  next()
}

//finally use all the available resource to create new record in team_info table
app.post('/InsertTeamInfo', getTeamCode, getMemberCount, async (req, res) => {
  const finalQuery = `INSERT INTO team_info VALUES ('${req.team_code}', '${req.member_code}', '${req.body.member_name}', '${req.body.member_role}');`

  db.query(finalQuery, (err) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    res.send("Team member data inserted successfully.")
  });
});

app.post('/InsertTournament', (req, res) => {
  const code = req.body.code
  const name = req.body.name
  let status = ""
  const start_date = req.body.start_date
  const end_date = req.body.end_date
  const current_date = new Date()
  const start = new Date(start_date)
  const end = new Date(end_date)

  //function buat check tanggal sekarang sama start date end date, buat nentuin status
  if (current_date < start) {
    status = "Upcoming"
  } else if (current_date > end) {
    status = "Completed"
  } else {
    status = "Ongoing"
  }

  const query = `INSERT INTO tournaments VALUES ('${code}', '${name}', '${status}', '${start_date}', '${end_date}');`

  db.query(query, (err) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    res.send("Tournament data inserted successfully.")
  });
});

//first, get the tournament_code from tournaments table, needed for match_code generation
async function getTournamentCode(req, res, next) {
  const getTournamentQuery = `SELECT * FROM tournaments WHERE tournament_name = ${req.body.tournament_name};`

  let getTournamentResult = await db.query(getTournamentQuery)
  if(getTournamentResult.err){
    console.error("Error executing query", getTournamentResult.err);
    return
  }
  req.tournament_code = getTournamentResult.rows[0].tournament_code

  next()
}

//next, count the existing matches in a tournament, to decide the number on match_code
async function getMatchCount(req, res, next) {
  const matchCountQuery = `SELECT COUNT(member_code) FROM team_info WHERE team_code = '${req.tournament_code}';`

  let matchCountResult = await db.query(matchCountQuery)
  if(matchCountResult.err){
    console.error("Error executing query", matchCountResult.err);
    return
  }
  let match_count = matchCountResult.rows[0].count
  req.match_code = req.tournament_code + "_" + (++match_count)

  next()
}

//finally use all the available resource to create new record in match_info table
app.post('/InsertMatch', getTournamentCode, getMatchCount, async(req, res) => {
  let status = ""
  const current_date = new Date()
  const match = new Date(req.body.match_date)

  const finalQuery = `INSERT INTO match_info (match_code, tournament_code, team_1_code, team_2_code,
                          match_date, match_status, match_stage, round_count)
                      VALUES ('${req.match_code}', '${req.tournament_code}', '${req.body.team_1_code}', '${req.body.team_2_code}',
                          '${req.body.match_date}', '${status}', '${req.stage}', '${req.round_count}');`

  if (current_date < match) {
    status = "Upcoming"
  } else if (current_date > match) {
    status = "Completed"
  } else {
    status = "Ongoing"
  }

  db.query(finalQuery, (err) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    res.send("Match inserted successfully.")
  });
});

async function getRoundCount(req, res, next) {
  const getRoundCountQuery = `SELECT COUNT(round_code) FROM round_detail WHERE match_code = '${match_code}';`

  let roundCountResult = await db.query(getRoundCountQuery)
  if(roundCountResult.err){
    console.error("Error executing query", roundCountResult.err);
    return
  }
  let round_count = roundCountResult.rows[0].count
  req.round_code = req.body.match_code + "_" + (++round_count)

  next()
}

app.post('/InsertRound', getRoundCount, async (req, res) => {
  const finalQuery = `INSERT INTO round_detail VALUES ('${req.round_code}', '${req.body.match_code}',
                          '${req.body.winner}', ${req.body.score_1}, ${req.body.score_2}, '${req.body.duration}');`

  db.query(finalQuery, (err) => {
    if (err) {
      console.error("Error executing query", err)
      return
    }
    res.send("Round inserted successfully.")
  })
})

app.delete("/matchInfo/:match_code", (req, res) => {
  const match_code = req.params.match_code;

  // Delete associated rows in round_detail table first
  db.query("DELETE FROM round_detail WHERE match_code = $1", [match_code])
    .then(() => {
      // After successful deletion from round_detail, delete the row from match_info
      db.query("DELETE FROM match_info WHERE match_code = $1", [match_code])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.error("Error deleting match", error);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.error("Error deleting associated round details", error);
      res.sendStatus(500);
    });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});