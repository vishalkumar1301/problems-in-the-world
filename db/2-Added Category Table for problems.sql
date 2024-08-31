-- Create Categories Table
CREATE TABLE problem_categories (
    category_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);



ALTER TABLE problems
DROP COLUMN category;



ALTER TABLE problems
ADD COLUMN category_id BIGINT UNSIGNED;



ALTER TABLE problems
ADD CONSTRAINT fk_problem_category
FOREIGN KEY (category_id) REFERENCES problem_categories(category_id);