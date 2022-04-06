SELECT * FROM department; 
SELECT * FROM roles;
SELECT * FROM employees;

INSERT INTO department(department_name)
VALUES ("Bears"),("Colts"),("Bills"),("Vikings");

INSERT INTO roles(title, salary, department_id)
        VALUES
        ("Line Backer",20,1),
        ("Defensive Lineman",45,2),
        ("Defensive Back", 12, 3),
        ("Running Back", 19, 4);

/* update managers */
INSERT INTO employees(first_name, last_name, roles_id, manager_id)
        VALUES
        ("Brian", "Urlacher",1,null),
        ("Walter", "Payton",2,1),
        ("Dick", "Butkus",1,null),
        ("Charles", "Tillman",3,null),
        ("Julius", "Peppers",2,null),
        ("Mike", "Brown",3,4),
        ("Lance", "Briggs",2,null),
        ("Tommie", "Harris",2,null)
        ;

 