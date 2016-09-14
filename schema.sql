DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(512) NOT NULL,
  subtitle VARCHAR(512),
  image_url VARCHAR(512),
  description TEXT,
  page_count INTEGER
);

DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE UNIQUE INDEX author_name ON authors (name);

DROP TABLE IF EXISTS book_authors;

CREATE TABLE book_authors (
  book_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS genres;

CREATE TABLE genres(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE UNIQUE INDEX genre_name ON genres (name);

DROP TABLE IF EXISTS book_genres;

CREATE TABLE book_genres (
  book_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL
);