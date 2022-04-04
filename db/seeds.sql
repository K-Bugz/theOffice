SELECT * FROM department; 
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department(name)
VALUES ("Bears"),("Colts"),("Bills"),("Vikings");

INSERT INTO role(title, salary, department_id)
        VALUES
        ("Line Backer",20,1)
        ("Defensive Lineman",45,2)
        ("Defensive Back", 12, 3)
        ("Running Back", 19, 4);

/* update managers */
INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES
        ("Brian", "Urlacher",1, 2),
        ("Walter", "Payton",2, 1),
        ("Dick", "Butkus",1, 1),
        ("Charles", "Tillman",3, 2),
        ("Julius", "Peppers",2, 3),
        ("Mike", "Brown",3, 2),
        ("Lance", "Briggs",2, 2),
        ("Tommie", "Harris",2, 2)
        ;