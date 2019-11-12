DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL (10, 2) NULL,
  stock_quantity INTEGER(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 10.00, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shoes", "clothing", 55.00, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("television", "electronics", 1200.00, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lawn mower", "gardening", 150.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cups", "kitchen", 10.00, 235);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("picture frames", "home", 10.00, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("oven", "kitchen", 1000.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("couch", "home", 1500.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 1500.00, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sox", "clothing", 10.00, 355);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("chocolate", 3.10, 120);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("strawberry", 3.25, 75);