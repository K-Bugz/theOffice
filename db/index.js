const connection = require('./connection')

class DB { // Create a DB object w/ the following methods
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query('SELECT * FROM employee.employees');
    }
}

module.exports = new DB(connection);