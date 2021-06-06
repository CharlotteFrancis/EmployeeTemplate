const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, 'output')
const outputPath = path.join(OUTPUT_DIR, 'team.html')

const render = require('./lib/htmlRenderer')

// array of employees
let employees = []

// write file

const output = _ => {
  fs.writeFile('./output/output.html', render(employees), err => {
    if (err) {
      console.log(err)
    }
    console.log('output.html created!')
  })
}

// function for number vlaidation
const numValid = (input) => {
  if (isNaN(parseFloat(input))) {
    return 'Not a number, please enter a number.\n'
  } else {
    return true
  }
}
// function to replay addEmployee
const cont = _ => {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'cont',
      message: 'Add another Employee?'
    }
  ])
    .then(({ cont }) => {
      if (cont) {
        addEmployee()
      } else {
        // print or render or whatever
        output()
      }
    })
    .catch(err => console.log(err))
}

// function for Manager -> prompt user for data then create object and push to employees array
const addManager = _ => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the Manager's name?"
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the Manager's ID number?",
      validate: numValid
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Manager's email address?"
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "What is the Manager's office number?",
      validate: numValid
    }
  ])
    .then((mAnswers) => {
      const manager = new Manager(mAnswers.name, mAnswers.id, mAnswers.email, mAnswers.officeNumber)
      employees.push(manager)
      cont()
    })
    .catch(err => console.log(err))
}
// function for Engineer -> prompt user for data then create object and push to employees array
const addEngineer = _ => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the Engineer's name?"
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the Engineer's ID number?",
      validate: numValid
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Engineer's email address?"
    },
    {
      type: 'input',
      name: 'github',
      message: "What is the Engineer's GitHub username?"
    }
  ])
    .then((eAnswers) => {
      const engineer = new Engineer(eAnswers.name, eAnswers.id, eAnswers.email, eAnswers.github)
      employees.push(engineer)
      cont()
    })
    .catch(err => console.log(err))
}
// function for Intern -> prompt user for data then create object and push to employees array
const addIntern = _ => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the Intern's name?"
    },
    {
      type: 'input',
      name: 'id',
      message: "What is the Intern's ID number?",
      validate: numValid
    },
    {
      type: 'input',
      name: 'email',
      message: "What is the Intern's email address?"
    },
    {
      type: 'input',
      name: 'school',
      message: 'Where did the Intern go to School?'
    }
  ])
    .then((eAnswers) => {
      const intern = new Intern(eAnswers.name, eAnswers.id, eAnswers.email, eAnswers.school)
      employees.push(intern)
      cont()
    })
    .catch(err => console.log(err))
}

// add an employee
const addEmployee = _ => {
  // prompt for role type
  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      choices: ['Manager', 'Engineer', 'Intern'],
      message: 'Please select the role of the Employee'
    }
  ])
    .then((answers) => {
      switch (answers.role) {
        case 'Manager':
          // add manager
          addManager()
          break
        case 'Engineer':
          // add engineer
          addEngineer()
          break
        case 'Intern':
          // add intern
          addIntern()
          break
        default:
          break
      }
    })
    .catch(err => console.log(err))
}

addEmployee()
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
