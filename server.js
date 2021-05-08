const inquirer = require('inquirer');
const RawListPrompt = require('inquirer/lib/prompts/rawlist');
const db = require('./db/connection');
const {
  viewEmployees,
  viewDepartments,
  viewRoles,
  addEmployee,
  removeEmployee,
  viewManagers,
  addRoles,
  removeRole,
  updateEmployeeRole,
  addDepartment
} = require('./employees');
require('console.table');


const actionArr = [
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      // 'View All Employees By Department',
      // 'View All Employees By Manager',
      'Add Employee',
      'Remove Employee',
      'Update Employee Role',
      // 'Update Employee Manager',
      'View All Roles',
      'Add Role',
      'Remove Role',
      'View All Departments',
      'Add Department',
      // 'Update Department',
      "That's it!!!"
    ]
  }
];

const employeesArr = (employeesChoices) => [
  {
    type: 'list',
    name: 'employee',
    message: 'Who would you like to delete?',
    choices: employeesChoices
  }
];

const rolesArr = (rolesChoices) => [
  {
    type: 'list',
    name: 'role',
    message: 'What role would you like to delete?',
    choices: rolesChoices
  }
];

const newRoleArr = (departmentsChoices) => [
  {
    type: 'input',
    name: 'title',
    message: 'What\'s the title of this role?',
    validate: input => !!input
  },
  {
    type: 'input',
    name: 'salary',
    message: 'How much for the salary?',
    validate: input => !!input
  },
  {
    type: 'list',
    name: 'department',
    message: 'Which department will it belong to?',
    choices: departmentsChoices
  }
];

const newDepartmentArr = [
  {
    type: 'input',
    name: 'department',
    message: 'What\'s the title of this department?',
    validate: input => !!input
  }
];

const addEmployeeArr = (roleChoices, managerChoices) => [
  {
    type: 'input',
    name: 'first_name',
    message: "What is the employee's first name?",
    validate: input => !!input
  },
  {
    type: 'input',
    name: 'last_name',
    message: "What is the employee's last name?",
    validate: input => !!input
  },
  {
    type: 'list',
    name: 'role',
    message: "What is the employee's role?",
    choices: roleChoices
  },
  {
    type: 'list',
    name: 'manager',
    message: "What is the employee's manager?",
    choices: managerChoices
  }
];

const updateEmployeeRoleArr = (employeesChoices, roleChoices) => [
  {
    type: 'list',
    name: 'name',
    message: "Which employee do you want to update?",
    choices: employeesChoices
  },
  {
    type: 'list',
    name: 'role',
    message: "What is the employee's role?",
    choices: roleChoices
  }
];

function promptAddEmployee() {
  viewRoles(rows => {
    const roleChoices = rows.map(row => ({
      name: row.title,
      value: row.id
    }));

    viewManagers(rows => {
      const managerChoices = rows.map(row => ({
        name: row.name,
        value: row.id
      }));
      inquirer.prompt(addEmployeeArr(roleChoices, managerChoices))
        .then(data => {
          const params = [
            data.first_name,
            data.last_name,
            data.role,
            data.manager
          ];

          addEmployee(params);
          console.log(`Added ${data.first_name} ${data.last_name} Successfully!`);
          menu();
        });
    });
  });
}

function promptRemoveEmployee() {
  viewEmployees(rows => {
    const employeesChoices = rows.map(row => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id
    }));
    inquirer.prompt(employeesArr(employeesChoices))
      .then(data => {
        const params = [
          data.employee
        ];

        removeEmployee(params);
        employeesChoices.map(emp => {
          if (emp.value === data.employee)
            console.log(`You have removed ${emp.name} from Employees!`);
        });
        menu();
      });
  });
}

function promptUpdateEmployee() {
  viewEmployees(rows => {
    const employeesChoices = rows.map(row => ({
      name: `${row.first_name} ${row.last_name}`,
      value: row.id
    }));

    viewRoles(rows => {
      const roleChoices = rows.map(row => ({
        name: row.title,
        value: row.id
      }));

      inquirer.prompt(updateEmployeeRoleArr(employeesChoices, roleChoices))
        .then(data => {
          const params = [
            data.role,
            data.name
          ];

          updateEmployeeRole(params);
          employeesChoices.map(role => {
            if (role.value === data.role)
              console.log(`Updated the Role of ${role.name} Successfully!`);
          });

          menu();
        });
    });
  })
}

function promptAddRole() {
  viewDepartments(rows => {
    const departmentsChoices = rows.map(row => ({
      name: row.name,
      value: row.id
    }));

    inquirer.prompt(newRoleArr(departmentsChoices))
      .then(data => {
        const params = [
          data.title,
          data.salary,
          data.department
        ];

        addRoles(params);
        console.log(`Added ${data.title} Successfully!`);
        menu();
      });
  });
}

function promptRemoveRole() {
  viewRoles(rows => {
    const rolesChoices = rows.map(row => ({
      name: row.title,
      value: row.id
    }));

    inquirer.prompt(rolesArr(rolesChoices))
      .then(data => {
        const params = [
          data.role
        ];

        removeRole(params);
        rolesChoices.map(role => {
          if (role.value === data.role)
            console.log(`You have removed ${role.name} from Roles!`);
        });
        menu();
      });
  });
}

function promptAddDepartment() {
  inquirer.prompt(newDepartmentArr).then(data => {
    const newDepart = [
      data.department
    ];

    addDepartment(newDepart);
    console.log(`${newDepart} has been added!`);
    menu();
  })
}

async function menu() {
  const { action } = await inquirer.prompt(actionArr);
  switch (action) {
    case "That's it!!!":
      break;

    case 'View All Employees':
      viewEmployees(rows => {
        console.table(rows);
        menu();
      });
      break;

    case 'View All Departments':
      viewDepartments(rows => {
        const newDeparts = rows.map((row) =>
        ({
          Departments: row.name
        }));
        console.table(newDeparts);
        menu();
      });
      break;

    case 'View All Roles':
      viewRoles(rows => {
        const newRoles = rows.map((row) =>
        ({
          Roles: row.title,
          Salary: row.salary,
          Department: row.department
        }));

        console.table(newRoles);
        menu();
      });
      break;

    case 'Add Employee':
      promptAddEmployee();
      break;

    case 'Remove Employee':
      promptRemoveEmployee();
      break;

    case 'Update Employee Role':
      promptUpdateEmployee();
      break;

    case 'Add Role':
      promptAddRole();
      break;

    case 'Remove Role':
      promptRemoveRole();
      break;

    case 'Add Department':
      promptAddDepartment();
      break;
  }
}

function main() {
  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    menu();
  });
}

// Start server after DB connection
main();
