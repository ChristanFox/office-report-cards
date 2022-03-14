const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMember = [];
const employeeId = [];

function teamBuilder() {

    function addManager() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is the name of the manager?',
                default: 'Christan Fox'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Please enter the ID for the manager:',
                default: '007'
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is the managers email address?',
                default: 'christanfox@gmail.com'
            },
            {
                type: 'input',
                name: 'managerPhone',
                message: 'Please enter the managers office telephone number:',
                default: '1-800-008-8008'
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerPhone);
            teamMember.push(manager);
            employeeId.push(answers.managerId);
            addMember();
        });
    }

    function addMember() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'nextMember',
                message: 'Please add another team member.',
                choices: ['Engineer', 'Intern', 'Done']
            }
        ]).then(userChoice => {
            switch (userChoice.nextMember) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                default:
                    generateHTML();   
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is the name of the engineer?',
                default: 'Kobe Bryant'
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'Please enter the ID for the engineer:',
                default: '08'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is the email of the engineer?',
                default: 'christanfox@gmail.com'
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: 'Please enter the github username for the engineer:',
                default: 'christanfox'
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMember.push(engineer);
            employeeId.push(answers.engineerId);
            addMember();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'What is the name of the intern?',
                default: 'Kobe Bryant'
            },
            {
                type: 'input',
                name: 'internId',
                message: 'Please enter the ID for the intern:',
                default: '24'
            },
            {
                type: 'input',
                name: 'internEmail',
                message: 'What is the email of the intern?',
                default: 'christanfox@gmail.com'
            },
            {
                type: 'input',
                name: 'internSchool',
                message: 'What is the name of the interns school?',
                default: 'Rutgers University'
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMember.push(intern);
            employeeId.push(answers.internId);
            addMember();
        });
    }

    function generateHTML() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        console.log('Generating....');
        fs.writeFileSync(outputPath, render(teamMember), 'utf-8');
    }
    addManager();
}

teamBuilder();