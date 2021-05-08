INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO managers (name)
VALUES
  ('Ronald Firbank'),
  ('Edward Bellamy'),
  ('Octavia Butler'),
  ('Charles LeRoi'),
  ('null');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 4),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, NULL),
  ('Katherine', 'Mansfield', 4, 4),
  ('Dora', 'Carrington', 5, NULL),
  ('Edward', 'Bellamy', 6, NULL),
  ('Montague', 'Summers', 7, 2),
  ('Octavia', 'Butler', 7, 2),
  ('Unica', 'Zurn', 3, 2);