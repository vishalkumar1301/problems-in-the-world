-- Create the database (if not already created)
CREATE DATABASE IF NOT EXISTS world_problems;

-- Use the database
USE world_problems;

-- Problems Table
CREATE TABLE problems (
    problem_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations Table
CREATE TABLE locations (
    location_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('CITY', 'STATE', 'COUNTRY', 'REGION') NOT NULL,
    parent_location_id BIGINT UNSIGNED,
    FOREIGN KEY (parent_location_id) REFERENCES locations(location_id)
);

-- Users Table
CREATE TABLE users (
    user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Problem Instances Table
CREATE TABLE problem_instances (
    instance_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT UNSIGNED NOT NULL,
    location_id BIGINT UNSIGNED NOT NULL,
    status ENUM('ONGOING', 'IMPROVING', 'WORSENING', 'RESOLVED') NOT NULL,
    severity INT CHECK (severity BETWEEN 1 AND 10),
    reported_by BIGINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_id) REFERENCES problems(problem_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id),
    FOREIGN KEY (reported_by) REFERENCES users(user_id)
);

-- Problem Updates Table
CREATE TABLE problem_updates (
    update_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    instance_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    update_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instance_id) REFERENCES problem_instances(instance_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Tags Table
CREATE TABLE tags (
    tag_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Problem Tags Table (for many-to-many relationship)
CREATE TABLE problem_tags (
    problem_id BIGINT UNSIGNED NOT NULL,
    tag_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (problem_id, tag_id),
    FOREIGN KEY (problem_id) REFERENCES problems(problem_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);