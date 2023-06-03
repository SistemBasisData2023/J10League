const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3001;

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});