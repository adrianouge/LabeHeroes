-- Active: 1675266082153@@127.0.0.1@3306

CREATE TABLE
    anime_heroes(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        alias TEXT DEFAULT 'none' NOT NULL,
        age NUMBER NOT NULL,
        universe TEXT NOT NULL
    );

CREATE TABLE
    comics_heroes(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        alias TEXT UNIQUE,
        age NUMBER NOT NULL,
        universe TEXT NOT NULL
    );

INSERT INTO
    anime_heroes(id, name, alias, age, universe)
VALUES (
        'ah001',
        "Izuku Midoriya",
        "Deku",
        16,
        "My Hero Academia"
    ), (
        'ah002',
        "Saitama",
        "One Punch Man",
        25,
        "One Punch Man"
    );

INSERT INTO
    comics_heroes(id, name, alias, age, universe)
VALUES (
        "ca001",
        "Peter Benjamin Parker",
        "Spider-Man",
        18,
        "Marvel"
    ), (
        "ca002",
        "Bruce Wayne",
        "Batman",
        35,
        "DC"
    );

DROP TABLE anime_heroes;

DROP TABLE comics_heroes 