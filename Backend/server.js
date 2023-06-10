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
      t.tournament_id,
      t.tournament_name,
      t.scope,
      u.match_id,
      um.team_code_1,
      um.team_code_2,
      um.stage,
      um.best_of,
      TO_CHAR(u.match_date, 'dd-mm-yyyy') AS match_date
    FROM
      tournaments t
      JOIN upcoming u ON t.tournament_id = u.tournament_code
      JOIN upcoming_matches um ON u.match_id = um.match_id;
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

app.post('/InsertTeam', (req, res) => {
  const code = req.body.code
  const name = req.body.name
  db.query(
    `INSERT INTO teams VALUES ('${code}', '${name}');`,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return
      }
      res.send("Team data inserted successfully.")
    }
  );
});

//param: team_name, member_name, sama member_role
//masih belom bisa, masalah di passing param yang varchar
app.post('/InsertTeamInfo', (req, res) => {
  const team_name = req.body.team_name
  let team_code = "";
  let member_count = 0;
  let member_code = "";

  //first, get the team_code from teams table, needed for member_id generation
  const getTeamQuery = `SELECT * FROM teams WHERE team_name = ${team_name};`
  //next, count the existing member in a team, to decide the number on member_id
  const memberCountQuery = `SELECT COUNT(member_code) FROM team_info WHERE team_code = ${team_code};`

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

  //finally use all the available resource to create new record in team_info table
  const finalQuery = `INSERT INTO team_info VALUES ('${team_code}', '${member_code}', '${req.body.member_name}', '${req.body.member_role}');`

  db.query(finalQuery, (err, result) => {
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
  
  //function buat check tanggal sekarang sama start date end date, buat nentuin status
  if(current_date < Date(String(start_date))){
    status = "Upcoming"
  } else if(current_date > Date(String(end_date))){
    status = "Completed"
  } else {
    status = "Ongoing"
  }

  const query = `INSERT INTO tournaments VALUES ('${code}', '${name}', '${status}', '${start_date}', '${end_date}');`

  db.query(query, (err, result) => {
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
  let match_count = 0
  let round_code = []
  const column_name = ["first_round_code", "second_round_code", "third_round_code",
    "fourth_round_code", "fifth_round_code", "sixth_round_code", "seventh_round_code"]

  //first, get the tournament_code from tournaments table, needed for match_code generation
  const getTournamentQuery = `SELECT * FROM tournaments WHERE tournament_name = ${tournament_name};`
  //next, count the existing matches in a tournament, to decide the number on match_code
  const matchCountQuery = `SELECT COUNT(match_code) FROM match_info WHERE tournament_code = ${tournament_code};`

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

  if(current_date < Date(String(match_date))){
    status = "Upcoming"
  } else if(current_date > Date(String(match_date))){
    status = "Completed"
  } else {
    status = "Ongoing"
  }

  //finally use all the available resource to create new record in match_info table
  const finalQuery = `INSERT INTO match_info (match_code, tournament_code, team_1_code, 
                          team_2_code, match_date, match_status, match_stage, round_count)
                      VALUES ('${match_code}', '${tournament_code}', '${team_1_code}', 
                          '${team_2_code}', '${match_date}', '${status}', '${stage}', '${round_count}');`

  db.query(finalQuery, (err) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
  });

  //inserting round_code to round_detail
  //and inserting round_code in match_info through update (previously NULL)
  switch(round_count){
    case 3:
      for(let i = 3; i > 0; i--){
        round_code[i-1] = match_code + "_" + i
      }
      const roundQuery3 = `
                          INSERT INTO round_detail (round_code)
                          VALUES ('${round_code[0]}'),
                                  ('${round_code[1]}'),
                                  ('${round_code[2]}');
                          UPDATE match_info
                          SET ${column_name[0]} = '${round_code[0]}'
                              ${column_name[1]} = '${round_code[1]}'
                              ${column_name[2]} = '${round_code[2]}'
                          WHERE match_code = '${match_code}';`

      db.query(roundQuery3, (err) => {
        if (err) {
          console.error("Error executing query", err);
          return
        }
        res.send("Match data inserted successfully.")
      })
      break
    case 5:
      for(let i = 5; i > 0; i--){
        round_code[i-1] = match_code + "_" + i
      }
      const roundQuery5 = `
                          INSERT INTO round_detail (round_code)
                          VALUES ('${round_code[0]}'),
                                  ('${round_code[1]}'),
                                  ('${round_code[2]}'),
                                  ('${round_code[3]}'),
                                  ('${round_code[4]}');
                          UPDATE match_info
                          SET ${column_name[0]} = '${round_code[0]}'
                              ${column_name[1]} = '${round_code[1]}'
                              ${column_name[2]} = '${round_code[2]}'
                              ${column_name[3]} = '${round_code[3]}'
                              ${column_name[4]} = '${round_code[4]}'
                          WHERE match_code = '${match_code}';`

      db.query(roundQuery5, (err) => {
        if (err) {
          console.error("Error executing query", err);
          return
        }
        res.send("Match data inserted successfully.")
      })
      break
    case 7:
      for(let i = 7; i > 0; i--){
        round_code[i-1] = match_code + "_" + i
      }
      const roundQuery7 = `
                          INSERT INTO round_detail (round_code)
                          VALUES ('${round_code[0]}'),
                                  ('${round_code[1]}'),
                                  ('${round_code[2]}'),
                                  ('${round_code[3]}'),
                                  ('${round_code[4]}'),
                                  ('${round_code[5]}'),
                                  ('${round_code[6]}');
                          UPDATE match_info
                          SET ${column_name[0]} = '${round_code[0]}'
                              ${column_name[1]} = '${round_code[1]}'
                              ${column_name[2]} = '${round_code[2]}'
                              ${column_name[3]} = '${round_code[3]}'
                              ${column_name[4]} = '${round_code[4]}'
                              ${column_name[5]} = '${round_code[5]}'
                              ${column_name[6]} = '${round_code[6]}'
                          WHERE match_code = '${match_code}';`

      db.query(roundQuery7, (err) => {
        if (err) {
          console.error("Error executing query", err);
          return
        }
        res.send("Match data inserted successfully.")
      })
      break
    default:
      console.error("Invalid round count");
      return
  }
});

app.put('/UpdateRound', (req, res) => {
  const round_code = req.body.round_code
  const winner = req.body.winner
  const score_1 = req.body.score_1
  const score_2 = req.body.score_2
  const duration = req.body.duration

  const query = `
                UPDATE round_detail
                SET winner_code = '${winner}'
                    team_1_score = '${score_1}'
                    team_2_score = '${score_2}'
                    duration = '${duration}
                WHERE round_code = '${round_code}'`

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err)
      return
    }
    res.send("Round updated successfully.")
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});