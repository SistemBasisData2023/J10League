const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bp = require("body-parser");

const app = express();
const port = 3001;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

const db = new Client({
  host: "ep-dry-dew-387527.ap-southeast-1.aws.neon.tech",
  user: "arka.brian",
  database: "proto3",
  password: "yJ9jXpk4Qefv",
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

app.post('/RegisterAdmin', (req, res) => {
  console.log('Request Body:', req.body); // Add this line to check the request body
  db.query(
    `INSERT INTO admin (username, password_hash) VALUES 
    ('${req.body.username}', crypt('${req.body.password_hash}', '$6$random_salt_string'));`, 
    (err) => {
      if (err) {
        console.error("Error executing query", err);
        return
      }
      res.send('Register Success ' + req.body.username + ' ' + req.body.password)
    })
});

app.post('/LoginAdmin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    `SELECT * FROM admin WHERE username = '${username}' AND password_hash = crypt('${password}', password_hash);`,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return res.status(500).send("Internal Server Error");
      }

      if (result.rows.length === 0) {
        // No matching user found
        return res.status(401).send("Invalid username or password");
      }

      res.send("Login successful");
    }
  );
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});