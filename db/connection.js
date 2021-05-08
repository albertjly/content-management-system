const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'GFQ1989@126.com',
  database: 'company_employees'
});

module.exports = db;