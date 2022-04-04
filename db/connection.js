const mysql = require('mysql2');
require('dotenv').config() // Need this to use the process

// Connect to database using hidden files
const connection = mysql.createConnection(
    {
        host: "local host",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log("Make connection w/ db!")
);

module.exports = connection