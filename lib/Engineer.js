// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

class Engineer extends Employee {
    constructor (name, id, email, github) {
        // When used in a constructor, the super keyword appears alone and must be used before the this keyword is used. 
        // The super keyword can also be used to call functions on a parent object. ("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super")
        super(name, id, email); 
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer