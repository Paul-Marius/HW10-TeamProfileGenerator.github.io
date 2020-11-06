const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output", "team.html");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const teamPositions = function () {
    inquirer.prompt([
        {
            type: "list",
            name: "position",
            message: "What is your position? select 'Finish Team' to end 'The Team'.",
            choices: ["Manager", "Engineer", "Intern", "Finish Team"]
        }
    ]).then(function (workers) {
        console.log(workers);

        role = workers["position"];
        console.log(role);

        specificQuestions();
    })
}

const specificQuestions = function () {
    switch (role) {
        case "Manager":
            inquirer.prompt([
                {
                    type: "input",
                    name: "Office Number",
                    message: "What is the manager's office number?"
                }
            ]).then(function (offNum) {
                console.log(offNum);

                officeNumber = offNum["Office Number"];
                console.log(officeNumber);

                regularQuestions();
            })
            break;

        case "Engineer":
            inquirer.prompt([
                {
                    type: "input",
                    name: "GitHub Username",
                    message: "What is the engineer's GitHub username?"
                }
            ]).then(function (gitUser) {
                console.log(gitUser);

                github = gitUser["GitHub Username"];
                console.log(github);

                regularQuestions();
            })
            break;

        case "Intern":
            inquirer.prompt([
                {
                    type: "input",
                    name: "School",
                    message: "Which school is the intern attending?"
                }
            ]).then(function (getSch) {
                console.log(getSch);

                school = getSch["Get School"];
                console.log(school);

                regularQuestions();
            })
            break;

        case "Finish Team":

            // problem --
            render(employees)
    }
}

const regularQuestions = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "Employee Name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "Employee ID",
            message: "What is the employee ID number?",

            validate: function (val) {
                var valid = !isNaN(parseFloat(val));
                return valid || "Please enter a number"
            }
        },
        {
            type: "input",
            name: "Employee Email",
            message: "What is the employee's email address?"
        },
    ]).then(function (answers) {

        name = answers["Employee Name"];
        console.log(name);

        id = answers["Employee ID"];
        console.log(id);

        email = answers["Employee Email"];
        console.log(email);

        newPositions();
    })
}

const newPositions = function (){
    switch (role) {
        case "Manager":
            employees.push(new Manager(name, id, email, officeNumber));
    
            teamPositions();
            break;
    
        case "Engineer":
            employees.push(new Engineer(name, id, email, github));
    
            teamPositions();
            break;
    
        case "Intern":
            employees.push(new Intern(name, id, email, school));
    
            teamPositions();
            break;
    }
}

teamPositions();
module.exports = employees;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
