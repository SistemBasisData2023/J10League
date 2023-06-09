<div align="center">
  <img src="Assets/J10League_Logo.png" width="200" title="hover text">
  <h1 align="center">Mobile Legends Tournament Monitoring Website 🎮</h1>
</div>

**Group J10**
+ [M Fathan Muhandis](https://github.com/fathanmuhandis) - 2106731623
+ [Arka Brian Dewara](https://github.com/arkadebrian) - 2106731421
+ [Jeffri](https://github.com/JeffriUI) - 2106705070

## Introduction
J10 League is a useful website for monitoring game tournaments, namely Mobile Legends. In it there will be a playing schedule of the teams that will compete, then there is a recap of the results of the matches of the teams that have competed which are filled with the results of the match winners, team profiles, and their the members. In addition, there is page stores information about all of the team from Indonesia include their logo. The Last, there will be a feature for admin logins so they can edit data on the website.

## Features

#### `Schedule Matches`

The Schedule Matches feature in J10 League provides a comprehensive overview of the upcoming game tournaments for Mobile Legends. It includes information such as the tournaments, teams, and date of each match. Users can refer to this schedule to stay updated on the upcoming matches and plan their viewing accordingly.

#### `Results Matches`

The Results Matches feature allows users to access the latest information and outcomes of the matches that have taken place in the Mobile Legends tournaments. It provides detailed match summaries, including the winners, scores, and players who played. Users can review the results to stay informed about the performance of different teams and players.

#### `The Teams`

The Teams feature provides a dedicated section where users can explore detailed profiles of the participating teams in the tournament of J10 League.

#### `Data Management for Admin`

The Data Management for Admin feature is designed specifically for website administrators. It offers a secure login system that grants authorized access to administrators. Once logged in, administrators can efficiently manage and update the data on the J10 League website.

## Tables

The following are tables used in the J10League's database.

### 1. `admin`

This table stores information about administrators of the J10League application.

- id
- username
- pass

### 2. `teams`

This table stores information about all of the team from Indonesia.

- team_code
- team_name

### 3. `team_info`

This table stores information about team information in details.

- team_code
- member_code
- member_name
- member_role

### 4. `tournaments`

This table stores information about tournament information in details.

- tournament_code
- tournament_name
- tournament_status
- start_date
- end_date

### 5. `match_info`

This table stores information about the match schedules of the teams that will compete and their results.

- match_code varchar
- tournament_code
- team_1_code
- team_2_code
- match_date
- match_status
- match_stage
- round_count
- team_1_score
- team_2_score
- match_winner

### 6. `round_detail`

This table stores information regarding the details of the match results.

- round_code
- match_code
- winner_code
- team_1_score
- team_2_score
- duration



## Getting Started

To get started with J10League, follow these simple steps:

1. Clone the repository: `git clone https://github.com/SistemBasisData2023/J10League.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Visit `http://localhost:3001` in your browser to access J10League.

## Technologies Used

- Node.js 
- Express 
- PostgreSQL 
- HTML
- CSS
- Tailwind
- JavaScript
- Libraries: axios, bcrypt, body-parser, cors, express, jsonwebtoken, nodemon, pg.

<p align="left"><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

## Flowchart

<details>
  <summary>Click Here</summary>
  
![Flowchart](Assets/J10League_Flowchart.png)

</details>

## UML Diagram

<details>
  <summary>Click Here</summary>

![UML_Diagram](Assets/J10League_UML_Diagram.png)

</details>

## Entity Relationship Diagram

<details>
  <summary>Click Here</summary>

![ER_Diagram](Assets/J10League_ER_Diagram.png)

</details>
