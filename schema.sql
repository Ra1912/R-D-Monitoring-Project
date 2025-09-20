-- Create DB only if it does not exist
-- Note: CREATE DATABASE does not support IF NOT EXISTS in PostgreSQL
-- So better create it once manually, then only keep the table creation below.

\c myprojectdb

CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);