-- Active: 1675014913249@@127.0.0.1@5432@auth_service@public
CREATE TABLE users (
    id          VARCHAR(100) PRIMARY KEY,
    firstname   VARCHAR(50) NOT NULL,
    lastname    VARCHAR(50) NOT NULL,
    image_url   VARCHAR(150) NOT NULL,
    email       VARCHAR(100) UNIQUE NOT NULL,
    password    VARCHAR(100) NOT NULL,
    verified    BOOLEAN NOT NULL DEFAULT 'f'
);
