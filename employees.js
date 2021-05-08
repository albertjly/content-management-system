// const express = require('express');
// const router = express.Router();
const db = require('./db/connection');

function viewEmployees(cb) {
    const sql = `SELECT
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
    LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        // console.table(rows);
        if (err) throw err;
        cb(rows);
    });
}

function viewDepartments(cb) {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
}

function viewRoles(cb) {
    const sql = `SELECT 
    roles.id AS id,
    roles.title AS title,
    roles.salary AS salary,
    departments.name AS department
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
}

function viewManagers(cb) {
    const sql = `SELECT * FROM managers`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        cb(rows);
    });
}

function addEmployee(values) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;

    db.query(sql, values, (err) => {
        if (err) throw err;
    });
}

function addRoles(values) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

    db.query(sql, values, (err) => {
        if (err) throw err;
    });
}

function removeEmployee(id) {
    const sql = `DELETE FROM employees WHERE id = ?`;

    db.query(sql, id, (err) => {
        if (err) throw err;
    });
}

function removeRole(id) {
    const sql = `DELETE FROM roles WHERE id = ?`;

    db.query(sql, id, (err) => {
        if (err) throw err;
    });
}

function updateEmployeeRole(ids) {
    const sql = `UPDATE employees
    SET role_id = ?
    WHERE id = ?`;

    db.query(sql, ids, (err) => {
        if (err) throw err;
    });
}

function addDepartment(value) {
    const sql = `INSERT INTO departments (name) VALUES (?)`;

    db.query(sql, value, (err) => {
        if (err) throw err;
    });
}

function removeDepartment(id) {
    const sql = `DELETE FROM departments WHERE id = ?`;

    db.query(sql, id, (err) => {
        if (err) throw err;
    });
}


module.exports = {
    viewEmployees,
    viewDepartments,
    viewRoles,
    addEmployee,
    removeEmployee,
    viewManagers,
    addRoles,
    removeRole,
    updateEmployeeRole,
    addDepartment,
    removeDepartment
};
