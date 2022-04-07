const db = require('./db/connection'); // pulling in connection
const inquirer = require('inquirer'); // Allows me to ask questions usiong inquirer
// const DB = require('./db/index'); // Add IFF I add modular functionality with the methods. 

// Golobal Array. Needed when inqueier asks about positions that don't exsist. I need to push new ones out to inquierer.
const rolesArray = []; // Can be const b/c arrays in JS are must not be contiguous data.  

// imported styles!!!
const logo = require('asciiart-logo');
const gradient = require('gradient-string');


// db is the connection to mySQL db. 
db.connect(function (err) { // once I connect to the db then I call the init(). 
    if (err) {
        console.log("Yep, an error. ")
        console.log(err)
    }
    // console.log("CONNECTED!")
    init();
});

function Quit() { // EndGame function! THANOS CLICK!
    console.log(gradient('white', 'pink')("Goodbye! (in AOL mail voice!)"));
    process.exit();
}

// I'd like to add the role_name to this display. 
function viewEmployees() { // Looks at all employees
    const request = "SELECT * FROM employees";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log(gradient('blue', 'pink')("Viewing All Players"));
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
    })
};
function viewRoles() { // Get db deaprtment data
    const request = "SELECT * FROM roles";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log(gradient('blue', 'pink')("Viewing All Roles"));
        console.log(gradient('green', 'yellow')("1: LineBacker"));
        console.log(gradient('green', 'yellow')("2: Running Back"));
        console.log(gradient('green', 'yellow')("3: Running Back"));
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

function viewDepartments() { // Get db deaprtment data
    const request = "SELECT * FROM department";
    db.query(request, function (err, res) {
        if (err) throw err;
        console.log(gradient('blue', 'pink')("Viewing All Departments"));
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


// Adds newEmp or player to DB
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
            type: "number",
            message: "Enter the employee's role id. 1:LineBacker   2:D-Line   3:DB   4:RB ",
            name: 'RoleID',
        },
        {
            type: "number",
            message: 'Enter thier managers ID',
            name: 'ManagerID',
        }

    ])
        // first_name VARCHAR(25),  last_name VARCHAR(25),  roles_id INT,  manager_id INT,
        .then(function (res) { // Insert user-input values into db
            const crit = [res.FirstName, res.LastName, res.RoleID, res.ManagerID];
            const sql = 'INSERT INTO employees(first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)';
            db.query(sql, crit, function (err, response) {
                if (err) throw err;
                console.table(response);
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
                            init();
                            break;
                        case 'Exit':
                            Quit();
                    }
                })
            }
            )
        })
};


// Adds new roles or positions
function newRoles() {
    inquirer.prompt([ // Get values from user
        {
            type: 'input',
            message: 'Enter a new position name.',
            name: 'position'
        },
        {
            type: 'input',
            message: 'Enter the players salary.',
            name: 'salary'
        }
    ])
        // title
        .then(function (res) { // Insert user-input values into db
            const crit = [res.position, res.salary];
            const sql = 'INSERT INTO roles(title, salary) VALUES (?,?)';
            db.query(sql, crit, function (err, response) {
                if (err) throw err;
                console.table(response);
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
                            init();
                            break;
                        case 'Exit':
                            Quit();
                    }
                })
            }
            )
        })
};



// Adds new department or teams
function newDepartments() {
    inquirer.prompt([ // Get values from user
        {
            type: 'input',
            message: 'Enter a team name.',
            name: 'DepartmentName'
        },
    ])
        // department_name
        .then(function (res) { // Insert user-input values into db
            const crit = [res.DepartmentName];
            const sql = 'INSERT INTO department(department_name) VALUES (?)';
            db.query(sql, crit, function (err, response) {
                if (err) throw err;
                console.table(response);
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
                            init();
                            break;
                        case 'Exit':
                            Quit();
                    }
                })
            }
            )
        })
};


// Update the employee role or position
function updateEmployeeRole() {
    inquirer.prompt([ // Get values from user
        {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee has a new role?',
            choices: rolesArray
        },
        {
            type: 'input',
            message: "What is the player's new position?",
            name: 'position'
        },
        {
            type: 'input',
            message: "What is the player's new salary?",
            name: 'salary'
        }
    ])
        // title
        .then(function (res) { // Insert user-input values into db
            const crit = [res.position, res.salary];
            const sql = 'INSERT INTO roles(title, salary) VALUES (?,?)';
            db.query(sql, crit, function (err, response) {
                if (err) throw err;
                // for each roles in resonse or db, then 
                response.forEach((roles) => { roleArray.push(role.title); });
                console.table(response);
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
                            init();
                            break;
                        case 'Exit':
                            Quit();
                    }
                })
            }
            )
        })
}

// Think about moving inquierer methods to another page to clean up index.js
// Make sure these methods are hoisted to the top so they run properly
function init() {  // The function to initialize it all and ask user what they desire. 
    const text = logo({ name: "The-Office" }).render();
    console.log(gradient('bold-green', 'blue', 'pink')(text));
    // console.log(text);
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option.',
            choices: [
                'View Players',
                'View Positions',
                'View Teams',
                'Add New Players',
                'Add Positions',
                'Add Teams',
                'update Employee Role',
                'Exit'
            ],
        }])
        .then((answer) => {
            switch (answer.choice) {
                case 'View Players':
                    viewEmployees();
                    // console.table(DB.findAllEmployees1());
                    // init();
                    break;
                case 'View Positions':
                    viewRoles();
                    break;
                case 'View Teams':
                    viewDepartments();
                    break;
                case 'Add New Players':
                    newEmployee();
                    break;
                case 'Add Positions':
                    newRoles();
                    break;
                case 'Add Teams':
                    newDepartments();
                    break;
                case 'update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    Quit();
                    break;
            }
        })
};
