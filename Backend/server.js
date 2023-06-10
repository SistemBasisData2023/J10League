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
  const { username, password } = req.body;

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the admin information into the database
    const query = "INSERT INTO admin (username, password_hash) VALUES ($1, $2)";
    await db.query(query, [username, hashedPassword]);

    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Failed to register admin" });
  }
});

app.post("/LoginAdmin", async (req, res) => {
  const { username, password } = req.body;
  
  db.query(
    `SELECT * FROM admin WHERE username = '${username}'`,
    async (err, result) => {
      if (result.rows.length === 0) {
        alert("Invalid username or password");
        return res.status(401).json({ error: "Invalid username or password" });
      }
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      const storedData = result.rows[0];
      bcrypt.compare(password, storedData.password_hash, (err, isMatch) => {
        if (err) {
          console.error("Error comparing password", err);
          return;
        }
        if (isMatch) {
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
  const memberCountQuery = `SELECT COUNT(member_id) FROM team_info WHERE team_code = ${team_code};`

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
  const finalQuery = `INSERT INTO team_info VALUES (${team_code}, '${member_code}', '${req.body.member_name}', '${req.body.member_role}');`

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
  var status
  const start_date = req.body.start_date
  const end_date = req.body.end_date
  const current_date = new Date()
  
  //function buat check tanggal sekarang sama start date end date, buat nentuin status
  if(current_date < Date(String(start_date))){

  }

  const query = `INSERT INTO tournaments (tournament_code, tournament_name, tournament_status, start_date, end_date) VALUES ('${code}', '${name}', '${status}', '${start_date}', '${end_date}');`

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    res.send("Tournament data inserted successfully.")
  });
});

app.post('/InsertMatch', (req, res) => {
  
});

//

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});