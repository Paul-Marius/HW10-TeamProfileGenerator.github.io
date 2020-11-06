// TODO: Write code to define and export the Engineer class.  
// HINT: This class should inherit from Employee.


const Employee = require("./Employee");

// The "extends" keyword is used to create a child class of 
//      another class (parent).
class Engineer extends Employee {
    constructor(name, id, email, github) {

        // The "super()" method refers to the parent class. 
        // By calling the super() method in the constructor method, 
        //      we call the parent's constructor method and gets access to the parent's 
        //      properties and methods.
        super(name, id, email);
        this.github = github;
    };
    getGithub(){
        return this.github;
    };

    getRole() {
        return "Engineer";
    };
}
module.exports = Engineer;

// ->by README-instruction.md line 106-112
// In addition to `Employee`'s properties and methods, `Engineer` will also have:

//   * github  // GitHub username

//   * getGithub()

//   * getRole() // Overridden to return 'Engineer'