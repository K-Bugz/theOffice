const connection = require('./connection')

class DB { // Create a DB object w/ the following methods
    constructor(connection) {
        this.connection = connection;
    }

    // could place methods here. 
    findAllEmployees() {
        return this.connection.query('SELECT * FROM employee.employees');
    }
}

// Creating a new instance of the DB class. Then call the connection. 
module.exports = new DB(connection);