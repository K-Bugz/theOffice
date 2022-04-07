const connection = require('./connection')

class DB { // Create a DB object w/ the following methods
    constructor(connection) {
        this.connection = connection;
    }

    // could place methods here. 
    findAllEmployees1() {
        return connection.query('SELECT * FROM employees');
    }
    // Add employee 
    addEmployee(employee) {
        return this.connection.query('INSERT INTO employees SET ?', employee);
    }

}

// Creating a new instance of the DB class. Then call the connection. 
module.exports = new DB(connection);