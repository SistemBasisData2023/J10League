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

// app.post('/RegisterAdmin', (req, res) => {
//   console.log('Request Body:', req.body); // Add this line to check the request body
//   db.query(
//     `INSERT INTO admin (username, password_hash) VALUES 
//     ('${req.body.username}', crypt('${req.body.password_hash}', '$6$random_salt_string'));`, 
//     (err) => {
//       if (err) {
//         console.error("Error executing query", err);
//         return
//       }
//       res.send('Register Success ' + req.body.username + ' ' + req.body.password)
//     })
// });

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


app.get("/LoginAdmin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = "SELECT * FROM admin WHERE username = $1";
    const result = await db.query(query, [username]);
    const admin = result.rows[0];

    if (!admin) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (isPasswordValid) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

/* ini masih kasar, gak tau bener apa nggak, jangan uncomment dulu -jep

app.post('/InsertTeams', (req, res) => {
  db.query(
    `INSERT INTO teams (team_code, team_name) VALUES ('${req.body.code}', '${req.body.name}');`,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return
      }
      res.json(result.rows) //post will return the inserted rows as json, dunno if will work or not, and kinda unnecessary so just erase if not needed
    }
  );
});

//param reqnya antara team_id, member_name, sama member_role
//atau mending team_id ganti team_name, soalnya pas masukin member user taunya nama tim, bukan id tim kan?
app.post('/InsertTeamsInfo', (req, res) => {
  const team_id = req.body.team_id
  var team_code
  var member_count
  var member_id

  //first, get the team_code from teams table, needed for member_id generation
  const getTeamQuery = `SELECT * FROM teams WHERE team_id = ${team_id}`
  //next, count the existing member in a team, to decide the number on member_id
  const memberCountQuery = `SELECT COUNT(member_id) FROM team_info WHERE team_id = ${team_id}`

  db.query(getTeamQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    team_code = result.body.team_code
  });

  db.query(memberCountQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    member_count = result.body.COUNT(member_id)
    //COUNT(member_id) is supposed to be the column name where the count number is stored, but dunno how correct case-sensitive? might have to test and revise
  });

  member_id = team_code + "_" + (++member_count) //auto-generate member_id from team_code, concatenate with underscore(_) and (member_count + 1)

  //finally use all the available resource to create new record in team_info table
  const finalQuery = `INSERT INTO team_info VALUES (${team_id}, '${member_id}', '${req.body.member_name}', '${req.body.member_role}')`

  db.query(finalQuery, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return
    }
    res.json(result.rows) //post will return the inserted rows as json, dunno if will work or not, and kinda unnecessary so just erase if not needed
  });
});

*/

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});