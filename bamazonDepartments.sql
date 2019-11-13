USE bamazonDB;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL (10, 2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("clothing", 15000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("electronics", 50000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("gardening", 25000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("kitchen", 15000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("home", 35000);
