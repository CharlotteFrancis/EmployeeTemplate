// TODO: Write code to define and export the Employee class
// name role email id

class Employee {
  constructor (name, id, email) {
    this.name = name
    this.id = id
    this.email = email
    this.role = 'Employee'
  }

  getName () {
    return this.name
  }

  getRole () {
    return this.role
  }

  getEmail () {
    return this.email
  }

  getId () {
    return this.id
  }
}

module.exports = Employee
