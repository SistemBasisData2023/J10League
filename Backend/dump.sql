--dump file for sql queries

CREATE TYPE status AS ENUM ('Upcoming', 'Ongoing', 'Completed');
CREATE TYPE role AS ENUM ('Jungler', 'Gold Laner', 'EXP Laner', 'Roamer', 'Mid Laner');
CREATE TYPE hero AS ENUM (
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

CREATE TABLE admin (
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);

CREATE TABLE teams (
    team_code varchar(3) PRIMARY KEY,
    team_name text UNIQUE NOT NULL
);

CREATE TABLE team_info (
    team_code varchar(3) REFERENCES teams,
    member_code varchar(6) PRIMARY KEY,
    member_name text UNIQUE NOT NULL,
    member_role role NOT NULL
);

CREATE TABLE tournaments (
    tournament_code varchar(3) PRIMARY KEY,
    tournament_name text UNIQUE NOT NULL,
    tournament_status status NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL
);

CREATE TABLE round_detail (
    round_code varchar(9) PRIMARY KEY,
    winner_code varchar(3) REFERENCES teams,
    team_1_score int NULL,
    team_2_score int NULL,
    duration text NULL
);

CREATE TABLE match_info (
    match_code varchar(6) PRIMARY KEY,
    tournament_code varchar(3) REFERENCES tournaments(tournament_code),
    team_1_code varchar(3) REFERENCES teams(team_code),
    team_2_code varchar(3) REFERENCES teams(team_code),
    match_date date NOT NULL,
    match_status status NOT NULL,
    match_stage text NOT NULL,
    round_count int NOT NULL,
    first_round_code varchar(9) UNIQUE REFERENCES round_detail,
    second_round_code varchar(9) UNIQUE REFERENCES round_detail,
    third_round_code varchar(9) UNIQUE REFERENCES round_detail,
    fourth_round_code varchar(9) UNIQUE REFERENCES round_detail,
    fifth_round_code varchar(9) UNIQUE REFERENCES round_detail,
    sixth_round_code varchar(9) UNIQUE REFERENCES round_detail,
    seventh_round_code varchar(9) UNIQUE REFERENCES round_detail
);
