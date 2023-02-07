-- Active: 1675733762916@@planify.ccjo9gy5a6ho.eu-central-1.rds.amazonaws.com@5432@planify@public
CREATE TABLE users (
    id          VARCHAR(100) PRIMARY KEY,
    firstname   VARCHAR(50) NOT NULL,
    lastname    VARCHAR(50) NOT NULL,
    image_url   VARCHAR(150) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(100) NOT NULL,
    verified    BOOLEAN NOT NULL DEFAULT 'f',
    user_plan   VARCHAR(250) NOT NULL DEFAULT ''
);

