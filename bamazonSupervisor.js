var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazondb"
  });

  connection.connect(function(err) {
    if (err) throw err;
    supervisorStartMenu();
  });

function supervisorStartMenu() {
    inquirer
      .prompt([
        {
          name: "startMenu",
          type: "list",
          message: "what would you like to do?",
          choices: ["View Product Sales by Department", "Create New Department"]
        },
     
      ])
      .then(function(answer) {
          
        switch (answer.startMenu){
            case "View Product Sales by Department":
            viewProductSalesByDepartment();
            break;
            case "Create New Department":
            createNewDepartment();
            break;
        }
    })
}

function viewProductSalesByDepartment(){

    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS 'product_sales' FROM departments LEFT JOIN products ON(products.department_name = departments.department_name) GROUP BY department_name ";
  
    connection.query(query,function(err, response) {
        if(err) throw err;
      console.log("department id| department name | over head costs | product sales | total profit")
      console.log("--------------------------------------------------------------------------------")
      for (var i = 0; i < response.length; i++) {
          console.log(response[i].department_id + " | " + response[i].department_name + " | " + response[i].over_head_costs + " | " + response[i].product_sales + "|" + (response[i].product_sales - response[i].over_head_costs));
        }
      supervisorStartMenu();
    })
    }
function createNewDepartment(){
    inquirer
      .prompt([
        {
          name: "departmentName",
          type: "input",
          message: "what is the name of the department you'd like to add?",
          
        },
        {
          name: "departmentOverHeadCost",
          type: "input",
          message: "what is the over head cost for this department?"
        }
     
    ])
      .then(function(answer) {
        connection.query(
        "INSERT INTO departments SET ?",
        {
            department_name: answer.departmentName,
            over_head_costs: answer.departmentOverHeadCost
        },
        function(err){
        if (err) throw err;
        supervisorStartMenu();
        }
        )} 
        )
    
}