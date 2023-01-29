CREATE TABLE IF NOT EXISTS band (
   id serial PRIMARY KEY,
   name VARCHAR UNIQUE NOT NULL,
   creationDate DATE not NULL
);

INSERT INTO band (name, creationDate) VALUES
('Pink Floyd', '01-09-1964'),
('Genesis', '01-06-1967'),
('Queen', '05-15-1970');