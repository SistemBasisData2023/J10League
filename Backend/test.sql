--dump text for copy paste sql queries

CREATE TYPE status AS ENUM ('Upcoming', 'Ongoing', 'Completed');
CREATE TYPE role AS ENUM ('Jungler', 'Gold Laner', 'EXP Laner', 'Roamer', 'Mid Laner');
CREATE TYPE HERO AS ENUM (
    'Aamon', 'Akai', 'Aldous', 'Alice', 'Alpha', 'Alucard', 'Angela', 'Argus', 'Arlott', 'Atlas', 
    'Aulus', 'Aurora', 'Badang', 'Balmond', 'Bane', 'Barats', 'Baxia', 'Beatrix', 'Belerick', 
    'Benedetta', 'Brody', 'Bruno', 'Carmilla', 'Cecilion', 'Chang_e', 'Chou', 'Claude', 'Clint', 
    'Cyclops', 'Diggie', 'Dyrroth', 'Edith', 'Esmeralda', 'Estes', 'Eudora', 'Fanny', 'Faramis', 
    'Floryn', 'Franco', 'Fredrinn', 'Freya', 'Gatotkaca', 'Gloo', 'Gord', 'Granger', 'Grock', 
    'Guinevere', 'Gusion', 'Hanabi', 'Hanzo', 'Harith', 'Harley', 'Hayabusa', 'Helcurt', 'Hilda', 
    'Hylos', 'Irithel', 'Jawhead', 'Johnson', 'Joy', 'Julian', 'Kadita', 'Kagura', 'Kaja', 
    'Karina', 'Karrie', 'Khaleed', 'Khufra', 'Kimmy', 'Lancelot', 'Lapu-Lapu', 'Layla', 'Leomord', 
    'Lesley', 'Ling', 'Lolita', 'Lunox', 'Luo Yi', 'Lylia', 'Martis', 'Masha', 'Mathilda', 'Melissa', 
    'Minotaur', 'Minsitthar', 'Miya', 'Moskov', 'Nana', 'Natalia', 'Natan', 'Novaria', 'Odette', 
    'Paquito', 'Pharsa', 'Phoveus', 'Popol and Kupa', 'Rafaela', 'Roger', 'Ruby', 'Saber', 'Selena', 
    'Silvanna', 'Sun', 'Terizla', 'Thamuz', 'Tigreal', 'Uranus', 'Vale', 'Valentina', 'Valir', 'Vexana', 
    'Wanwan', 'X.Borg', 'Xavier', 'Yi Sun-Shin', 'Yin', 'Yu Zhong', 'Yve', 'Zhask', 'Zilong'
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);

CREATE TABLE teams (
    team_id serial PRIMARY KEY,
    team_code varchar(3) NOT NULL,
    team_name text NOT NULL
);

CREATE TABLE team_info (
    team_id int REFERENCES teams,
    member_id varchar(6) PRIMARY KEY,
    member_name text NOT NULL,
    member_role role
);

CREATE TABLE tournaments (
    tournament_id serial PRIMARY KEY,
    tournament_code varchar(3) NOT NULL,
    tournament_name text NOT NULL,
    tournament_status status NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL
);

CREATE TABLE match_info (
    match_id varchar(6) PRIMARY KEY,
    team_id_1 int NOT NULL,
    team_id_2 int NOT NULL,
    match_date date NOT NULL,
    match_status status NOT NULL,
    match_stage text NOT NULL,
    round_counts int NOT NULL,
    first_round_id varchar(9) UNIQUE NOT NULL,
    second_round_id varchar(9) UNIQUE NOT NULL,
    third_round_id varchar(9) UNIQUE NOT NULL,
    fourth_round_id varchar(9) UNIQUE NULL,
    fifth_round_id varchar(9) UNIQUE NULL,
    sixth_round_id varchar(9) UNIQUE NULL,
    seventh_round_id varchar(9) UNIQUE NULL
);

CREATE TABLE tournament_matches (
    tournament_id int REFERENCES tournaments,
    match_id varchar(6) REFERENCES match_info
);

CREATE TABLE round_detail (
    round_id varchar(9) PRIMARY KEY,
    winner_id int REFERENCES teams,
    team_1_score int NOT NULL,
    team_2_score int NOT NULL,
    duration text NOT NULL
);

CREATE TABLE round_loadout (
    round_id varchar(9) REFERENCES round_detail,
    member_id varchar(6) REFERENCES team_info,
    hero HERO NOT NULL
);