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
    managerStartMenu();
  });



function managerStartMenu() {
    inquirer
      .prompt([
        {
          name: "startMenu",
          type: "list",
          message: "what would you like to do?",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        },
     
      ])
      .then(function(answer) {
          
        switch (answer.startMenu){
            case "View Products for Sale":
            viewProducts();
            break;
            case "View Low Inventory":
            viewLowCount();
            break;
            case "Add to Inventory":
            promptForWhichItem();
            break;
            case "Add New Product":
            addNewProduct();
            break;
        }
    })
}
function viewProducts(){
        connection.query("SELECT * FROM products", function(err, results){
            if(err) throw err;
            console.log("product name | department name | price | stock quantity")
            for (var i = 0; i < results.length; i++) {
                console.log(results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
              }
            managerStartMenu();
         
        })
}

function viewLowCount(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results){
        if(err) throw err;
        console.log("product name | department name | price | stock quantity")
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
          }
        managerStartMenu();
    })
}

function promptForWhichItem(){
    
    connection.query("SELECT * FROM products", function(err, results){
        if(err) throw err;
        
        inquirer
        .prompt([
            {
                name: "itemToUpdate",
                type: "list",
                message: "which item would you like to add inventory to?",
                choices: function(){
                    var choiceArray = [];
                    for(var i=0; i<results.length;i++){
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            }
        ])
        .then(function(answer){
            
            promptHowManyToAdd(answer.itemToUpdate);

        })
    })

}
function promptHowManyToAdd(item){
    connection.query("SELECT * FROM products WHERE product_name=?",[item], function(err, results){
        if(err) throw err;
    inquirer.prompt([
        {
            name: "amountToAdd",
            type: "input",
            message: "how many " + item + " would you like to add? "
        }
    ])
    .then(function(answer){
        var newAmount = parseInt(answer.amountToAdd) + parseInt(results[0].stock_quantity);
        console.log(newAmount)
        addToInventory(item, newAmount);
    })
})
}
function addToInventory(item, amount){

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: amount
        },
    {
            product_name: item
    }], function(err){
        if (err) throw err;
    }
    )
    managerStartMenu();
}
function addNewProduct(){
    connection.query("SELECT * FROM departments", function(err, dResults){
        if(err) throw err;
    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product you'd like to add?"
        },
        {
            name: "departmentName",
            type: "list",
            message: "What is the department the product belongs to?",
            choices: function(){
                var choiceArray = [];
                for(var i=0; i<dResults.length;i++){
                    choiceArray.push(dResults[i].department_name);
                }
                return choiceArray;
            }
        },
        {
            name: "productPrice",
            type: "input",
            message: "What is the price of the product?"
        },
        {
            name: "productQuantity",
            type: "input",
            message: "How many would you like to add?"
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO products SET ?",[{
                product_name: answer.productName,
                department_name: answer.departmentName,
                price: answer.productPrice,
                stock_quantity: answer.productQuantity

            }]
        )
        managerStartMenu();
    })
    })
}


