-- init.sql
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL
);

-- Optionally, insert some initial data
INSERT INTO products (name, description, price, quantity)
VALUES
  ('Product 1', 'Description for product 1', 10.00, 100),
  ('Product 2', 'Description for product 2', 20.00, 50);
