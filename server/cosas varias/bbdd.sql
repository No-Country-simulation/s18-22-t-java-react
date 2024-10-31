DROP DATABASE if EXISTS clinica;
CREATE DATABASE clinica CHARACTER SET utf8 COLLATE UTF8_GENERAL_CI;
USE clinica;


CREATE TABLE user (
	id BIGINT UNSIGNED  AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(250)  NOT NULL,
    img TEXT,
    phone VARCHAR(250)  NOT NULL,
     rol ENUM('MEDIC','PATIENT'),
     initial_date DATE NOT NULL,
	  active BOOLEAN DEFAULT TRUE 
);

CREATE TABLE authorizarion (
	id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL ,
    jwt VARCHAR(250) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

#ALTER TABLE user ADD rol ENUM('MEDIC','PACIENT');
#ALTER TABLE user ADD  initial_date DATE NOT NULL;

SELECT * FROM user;
SELECT * FROM authorization;
SELECT * FROM doctor;
SELECT * FROM patients;
describe doctor;
describe user;
describe authorization;