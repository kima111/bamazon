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
    askProductID();
  });

function report(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
    console.log(results);
    })
}

function askProductID() {
    inquirer
      .prompt([
        {
          name: "productID",
          type: "input",
          message: "What is the item you would like to purchase?"
        },
     
      ])
      .then(function(answer) {
        connection.query("SELECT * FROM products", function(err, results){
            if(err) throw err;
            var inInventory = false;
            for(i=0;i<results.length;i++){
                if(answer.productID===results[i].product_name){
                    inInventory = true;
                }
            }
            if (inInventory===true){
                askHowMany(answer.productID);
            }
            else{
                console.log("not in inventory")
                askProductID();
            }
        })
      })
}

function askHowMany(productName){
    inquirer
    .prompt([
      {
        name: "productQuantity",
        type: "input",
        message: "How many " + productName + " would you like to purchase?"
      },
   
    ])
    .then(function(answer){

        connection.query("SELECT * FROM products WHERE product_name=?", [productName], function(err, results){
            if(err) throw err;
           
         
            if(answer.productQuantity > results[0].stock_quantity){
                console.log("Sorry we only have " + results[0].stock_quantity + " in stock");
                askHowMany(productName);
            }
            else{
                var newQuantity = results[0].stock_quantity - answer.productQuantity;
                console.log("Your total purchase was: $" + (answer.productQuantity * results[0].price))
                updatedQuantity(productName, newQuantity)
            }
        })
    })
}

function updatedQuantity(productName, quantity){
    connection.query(
        "UPDATE products SET ? WHERE ?",[{
            stock_quantity: quantity
        },
    {
            product_name: productName
    }], function(err){
        if (err) throw err;
    }
    )
    askProductID();

}
