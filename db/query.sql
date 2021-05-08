DROP TABLE IF EXISTS newtable;
CREATE TABLE newtable AS 
  (SELECT
    employees.id AS id,
    employees.first_name AS first_name,
    employees.last_name AS last_name,
    roles.title AS title,
    roles.salary AS salary,
    departments.name AS department,
    managers.name AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN managers ON employees.manager_id = managers.id
    LEFT JOIN departments ON roles.department_id = departments.id);
    
  --   CREATE TABLE result AS 
  -- (SELECT first.*, 
  --         second.f1, 
  --         second.f2, 
  --         second.f3 
  --  FROM   first 
  --         INNER JOIN second 
  --                 ON first.id = second.id);
