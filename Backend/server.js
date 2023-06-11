const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bp = require("body-parser");
const bcrypt = require("bcrypt");

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
      t.scope, 
      m.match_code, 
      m.team_1_code, 
      m.team_2_code,
      r.team_1_score, 
      r.team_2_score
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

app.post("/RegisterAdmin", async (req, res) => {
  const { username, pass } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Insert the admin information into the database
    const query = "INSERT INTO admin (username, pass) VALUES ($1, $2)";
    await db.query(query, [username, hashedPassword]);

    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Failed to register admin" });
  }
});

app.post("/LoginAdmin", async (req, res) => {
  const { username, pass } = req.body;
  
  db.query(
    `SELECT * FROM admin WHERE username = '${username}'`,
    async (err, result) => {
      if (result.rows.length === 0) {
        window.alert("Username not found");
        return res.status(401).json({ error: "Invalid username or password" });
      }
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      const storedData = result.rows[0];
      bcrypt.compare(pass, storedData.pass, (err, isMatch) => {
        if (err) {
          console.error("Error comparing password", err);
          return;
        }
        if (!isMatch) {
          return res.status(200).json({ message: "Login success" });
        } else {
          return res.status(401).json({ error: "Invalid username or password" });
        }
      })
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

//param: team_name, member_name, sama member_role
//kayaknya harus pake async
app.post('/InsertTeamInfo', (req, res) => {
  const team_name = req.body.team_name
  let team_code = "";
  let member_count = 0;
  let member_code = "";
  //variabel-variabelnya keisi di scope 2 query yang select
  //tapi pas dipake di query insert malah isinya blank

  //first, get the team_code from teams table, needed for member_id generation
  const getTeamQuery = `SELECT * FROM teams WHERE team_name = '${team_name}';`
  //next, count the existing member in a team, to decide the number on member_id
  const memberCountQuery = `SELECT COUNT(member_code) FROM team_info WHERE team_code = '${team_code}';`
  //finally use all the available resource to create new record in team_info table
  const finalQuery = `INSERT INTO team_info VALUES ('${team_code}', '${member_code}', '${req.body.member_name}', '${req.body.member_role}');`

  db.query(getTeamQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    team_code = result.rows[0].team_code;
  });

  db.query(memberCountQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    member_count = result.rows[0].count;
    //auto-generate member_id from team_code, concatenate with underscore(_) and (member_count + 1)
    member_code = team_code + "_" + (++member_count)
  });

  //tapi disini tetep kosong atau ""
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
  if(current_date < start){
    status = "Upcoming"
  } else if(current_date > end){
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

app.post('/InsertMatch', (req, res) => {
  let match_code = ""
  const tournament_name = req.body.tournament_name
  const team_1_code = req.body.team_1_code
  const team_2_code = req.body.team_2_code
  const match_date = req.body.match_date
  let status = ""
  const stage = req.body.stage
  const round_count = req.body.round_count
  let tournament_code = ""
  const current_date = new Date()
  const match = new Date(match_date)

  //first, get the tournament_code from tournaments table, needed for match_code generation
  const getTournamentQuery = `SELECT * FROM tournaments WHERE tournament_name = ${tournament_name};`
  //next, count the existing matches in a tournament, to decide the number on match_code
  const matchCountQuery = `SELECT COUNT(match_code) FROM match_info WHERE tournament_code = ${tournament_code};`
  //finally use all the available resource to create new record in match_info table
  const finalQuery = `INSERT INTO match_info VALUES ('${match_code}', '${tournament_code}', '${team_1_code}',
                          '${team_2_code}', '${match_date}', '${status}', '${stage}', '${round_count}');`

  db.query(getTournamentQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    tournament_code = result.rows[0].tournament_code;
  });

  db.query(matchCountQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    match_count = result.rows[0].count;
    //auto-generate match_code from tournament_code, concatenate with underscore(_) and (match_count + 1)
    match_code = tournament_code + "_" + (++match_count)
  });

  if(current_date < match){
    status = "Upcoming"
  } else if(current_date > match){
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

app.post('/InsertRound', (req, res) => {
  let round_code = ""
  const match_code = req.body.match_code
  const winner = req.body.winner
  const score_1 = req.body.score_1
  const score_2 = req.body.score_2
  const duration = req.body.duration
  let round_count = 0

  const getRoundCountQuery = `SELECT COUNT(round_code) FROM round_detail WHERE match_code = '${match_code}';`

  db.query(getRoundCountQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err)
      return
    }
    round_count = result.rows[0].count
    round_code = match_code + "_" + (++round_count)
  })

  const finalQuery = `INSERT INTO round_detail VALUES ('${round_code}', '${match_code}',
                          '${winner}', ${score_1}, ${score_2}, '${duration}');`

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

  db.query("DELETE FROM match_info WHERE match_code = $1", [match_code])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("Error deleting match", error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});