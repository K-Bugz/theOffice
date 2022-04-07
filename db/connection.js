const mysql = require('mysql2'); // Package that allows us to make connections and run queries
require('dotenv').config() // Need this to use the process

// Connect to database using hidden files
const connection = mysql.createConnection(
    {
        host: process.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    // console.log("Make connection w/ db!")
);

module.exports = connection