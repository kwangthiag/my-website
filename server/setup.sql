DROP DATABASE blogdb;
-- Create a new database
CREATE DATABASE blogdb;


-- Switch to the newly created database (optional for psql)
\c blogdb

CREATE USER admin WITH PASSWORD 'p@ssword';

GRANT ALL PRIVILEGES ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON DATABASE blogdb TO admin;

-- Create a table for blogs
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  media VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE blogs ADD COLUMN media VARCHAR(500);

-- -- Insert some initial data into the blogs table
-- INSERT INTO blogs (title, body) VALUES 
--   ('First Blog', 'This is the first blog post.'),
--   ('Second Blog', 'This is the second blog post.');
