const db = require('./db/connection'); // pulling in connection
const inquirer = require('inquirer'); // Allows me to ask questions usiong inquirer
// const { connection } = require('./db'); 

// Add the follwoing below later in version 2.0
// const logo = require('asciiart-logo');
// const gradient = require('gradient-string');

db.connect(function (err) { // once I connect to the db then I call the init(). 
    if (err) {
        console.log("Yep, an error. ")
        console.log(err)
    }
    console.log("CONNECTED!")
    init();
});

function Quit() { // EndGame function
    console.log("Goodbye! (in AOL mail voice!)");
    process.exit();
}


function viewEmployees() { // Looks at all employees
    const request = "SELECT * FROM employees";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log("Viewing All Employees");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Main Menu',
                    'Exit'
                ],
            }
        ]).then((answer) => {
            switch (answer.choice) {
                case 'Main Menu':
                    init();
                    break;
                case 'Exit':
                    Quit();
            }
        })
        // init();
    })
};


function viewDepartments() { // Get db deaprtment data
    const request = "SELECT * FROM department";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log("Viewing All Departments");
        console.table(res);
        inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'select an option.',
                choices: [
                    'Main Menu',
                    'Exit'
                ]
            }
        ])
            .then((answer) => {
                switch (answer.choice) {
                    case 'Main Menu':
                        init();
                        break;
                    case 'Exit':
                        Quit();
                }
            })
    })
};


// id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
// first_name VARCHAR(30) NOT NULL,
// last_name VARCHAR(30) NOT NULL,
// role_id INT NOT NULL,
// manager_id INT NOT NULL,
// Role ID
// ("Line Backer",20,1)
// ("Defensive Lineman",45,2)
// ("Defensive Back", 12, 3)
// ("Running Back", 19, 4);
function newEmployee() {
    inquirer.prompt([ // Get values from user
        {
            type: 'input',
            message: 'Enter employee first name.',
            name: 'FirstName'
        },
        {
            type: 'input',
            message: 'Enter employee last name.',
            name: 'LastName'
        },
        {
            type: 'input',
            message: "Enter the employee's role id. 1:LineBacker /n2:D-Line/n3:DB/n4:RB ",
            name: 'RoleID'
        },
        {
            type: 'input',
            message: 'Enter thier managers ID',
            name: 'ManagerID'
        }

    ])
        .then(function (response) { // Insert user-input values into db
            connection.query('INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)',
                [response.FirstName, response.LastName, response.RoleID, response.ManagerID]), function (err, response) {
                    if (err) throw err;
                    console.table(res);
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'choice',
                            message: 'select an option.',
                            choices: [
                                'Main Menu',
                                'Exit'
                            ]
                        }
                    ]).then((answer) => {
                        switch (answer.choice) {
                            case 'Main Menu':
                                start();
                                break;
                            case 'Exit':
                                Quit();
                        }
                    })
                }
        })
};


// Think about moving inquierer methods to another page to clean up index.js
// Make sure these methods are hoisted to the top so they run properly
function init() {  // The function to initialize it all and ask user what they desire. 
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option.',
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'Add New Employee',
                'Exit'
            ],
        }])
        .then((answer) => {
            switch (answer.choice) {
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'Add New Employee':
                    newEmployee();
                    break;
                case 'Exit':
                    Quit();
                    break;
            }
        })
};
