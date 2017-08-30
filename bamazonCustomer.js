// require the npm packages needed 
var mysql = require("mysql");
var inquirer = require("inquirer")
require('console.table');


// connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // your password
    password: "root",
    database: "BAMAZON"
});

// function to connect to the database, chaining the functions to occur one after the other
connectdb().then(function() {
    // once the connection is finished, run showdb function which displays all of the items for sale
    return showdb();
}).then(function(res) {
    // then run the userchoice function to prompt the user to give the id and quantity of item they want 
    return userchoice(res);
    // inquirer response values
}).then(function(res) {
    // then run the checkstock function to check if the amount of the item the user wants is available
    return checkstock(res);
}).then(function(res) {
    connection.end();
});

// function to show the database in node
function showdb() {
    return new Promise(function(success, failure) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
                failure(err);
            } else {
                // console.table will show the results in a table format in node 
                // table.tty-table(res);
                // console.log(tty-table)
                console.table(res);
                success(res);
            }
        });
    });
}

// function to connect to the database. using a promise to help sequence asynchronous requests
function connectdb() {
    return new Promise(function(success, failure) {
        connection.connect(function(err) {
            // if error reject a promise
            if (err) failure(err);
            console.log("connected as id " + connection.threadId);
            console.log("connected as id " + connection.threadId);
            success();
        });
    });
}

function userchoice(res) {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of your item?",
            name: "item_id"
        },

    
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "stock_quantity"
        }
    ]);
}

// general function to query the database that can be used multiple times 
function queryDB(querystring, queryobject) {
    return new Promise(function(success, failure) {
        connection.query(querystring, queryobject, function(err, res) {
            if (err) {
                failure(err);
            } else {
                success(res);
            }
        });
    });
}

// function to check the stock in the database against the user response
function checkstock(userResponse) {
    // return the database query for these column names and then check it against the user response
    return queryDB("SELECT product_name, stock_quantity, price FROM products where item_id = ?", [+userResponse.item_id])
        // pass in the database response into the then function
        .then(function(databaseResponse) {
            // if statement to check what the user wants against what is available in the database
            if (+userResponse.stock_quantity <= databaseResponse[0].stock_quantity) {

                // message to user if there's enough in stock to fulfill their request
                console.log("**************************************")
                console.log("        ________^^^_______")
                console.log("        ______(*<^>*)______");
                console.log("___________()()()()()()___________");
                console.log("\n")
                console.log("*******CONGRATS! YOU JUST PURSHASE******** \n\n\n____" + userResponse.stock_quantity + "____ for $" + ((databaseResponse[0].price * (+userResponse.stock_quantity)).toFixed(2)));
                console.log("***You are such a great friend***")



                // update the database to reflect that the user has made a purchase and that the stock has been decreased
                updatestock(databaseResponse[0].stock_quantity - +userResponse.stock_quantity, +userResponse.item_id);
            } else {
                // let the user know that the request can't be fulfilled
                console.log("__________________________________")
                console.log("Insufficient Quantity in Stock!");
                console.log("__________________________________")
            }
        });
}
// function to update the stock by returning the queryDB function and passing in parameters to update the stock
function updatestock(updated_quantity, item_id) {
    return queryDB("UPDATE products SET stock_quantity=? WHERE item_id=?", [updated_quantity, item_id]);
}
