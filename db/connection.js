const mysql = require('mysql2');
require('dotenv').config() // Need this to use the process

// Connect to database
const connection = mysql.createConnection(
    {
        host: "local host",
        user: "root",
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log("Make connection w/ db!")
);

module.exports = connection