// Question 1:
// Create a MySQL database by the name "myDB" and
// create a database user by the name "myDBuser" with a permissions to connect with the "myDB" database.
// Use the "mysql" module to create a connection with the newly created database.
// Display console message if the connection is successful or if it has an error.


// importing mysql2
const mysql = require("mysql2");

//creating connection 
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "myDBuser",
  database: "myDB",
  port: 3306,
  multipleStatements: true,
});

//making sure that connection is created
mysqlConnection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});




/* 
Question 2: 
Here is a link to a document that contains the tables we need to create and convert the apple.com/iphones page into a dynamic page with a database. 

As you can see from the document, there are 5 tables that are needed (please scroll horizontally and vertically over the document to see all the 5 tables).

Write a SQL query to create the apple.com tables inside of the "myDB" database you created above. 

Once you write the queries, use the "mysql" module to execute the queries on the database. Try both of these methods to initiate the execution of the queries:

● Include the execution code directly in the module to be executed as you run the app.

● Use the Express module to receive requests. 
Configure your module in a way that it executes the queries when the "/install" URL is visited.

Please find further instructions under the “Instructions for question 2” below
*/

//importing express
const express = require("express");

// creating server using express
const app = express();

// creating listening port
let port = 1234;
app.listen(port, () => {
  console.log("server running: 1234");
});


//creating GET API endpoint
app.get("/install", (req, res) => {
  
  let message = "Tables successfully Created";

  const createProducts = `
CREATE TABLE IF NOT EXISTS products (
product_id INT AUTO_INCREMENT PRIMARY KEY,
product_url VARCHAR(100) NOT NULL,
product_name VARCHAR(100)  NOT NULL
);`;

  let createProductDescription = `
CREATE TABLE IF NOT EXISTS product_description (
description_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
product_brief_description VARCHAR(255) NOT NULL,
product_description VARCHAR(255) NOT NULL,
product_img VARCHAR(255) NOT NULL,
product_link VARCHAR(255) NOT NULL,
FOREIGN KEY (product_id) REFERENCES products(product_id)
);`;

  let createProductPrice = `
CREATE TABLE IF NOT EXISTS product_price(
price_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
starting_price VARCHAR(100) NOT NULL,
price_range VARCHAR(100) NOT NULL,
FOREIGN KEY (product_id) REFERENCES products(product_id)
);`;

  let createUser = `
CREATE TABLE IF NOT EXISTS users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
user_name VARCHAR(100),
user_password VARCHAR(100)
);`;

  let createOrder = `
CREATE TABLE IF NOT EXISTS orders (
order_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT,
user_id INT,
FOREIGN KEY (product_id) REFERENCES products(product_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)

);`;

  // or we can write all queries at a time

  let createAllTables = `

-- To create product table

CREATE TABLE IF NOT EXISTS products (
product_id INT AUTO_INCREMENT PRIMARY KEY,
product_url VARCHAR(100) NOT NULL,
product_name VARCHAR(100)  NOT NULL
);

-- To create product description table

CREATE TABLE IF NOT EXISTS product_description (
description_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
product_brief_description VARCHAR(255) NOT NULL,
product_description VARCHAR(255) NOT NULL,
product_img VARCHAR(255) NOT NULL,
product_link VARCHAR(255) NOT NULL,
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- To create product price table

CREATE TABLE IF NOT EXISTS product_price(
price_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT NOT NULL,
starting_price VARCHAR(100) NOT NULL,
price_range VARCHAR(100) NOT NULL,
FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- To create users table
CREATE TABLE IF NOT EXISTS users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
user_name VARCHAR(100),
user_password VARCHAR(100)
);

-- To create orders table 

CREATE TABLE IF NOT EXISTS orders (
order_id INT AUTO_INCREMENT PRIMARY KEY,
product_id INT,
user_id INT,
FOREIGN KEY (product_id) REFERENCES products(product_id),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

`;

   // //Excuting the SQL statements (traditionally one by one) -- Method 1

  // mysqlConnection.query(createProducts, (err) => {
  //     if (err) console.log("Error while creating product table: ",err);
  //     else console.log("product table created successfully");
  //   });

  //   mysqlConnection.query(createProductDescription, (err) => {
  //     if (err) console.log("Error while creating Description table: ",err);
  //     else console.log("Description table created");
  //   });

  //   mysqlConnection.query(createProductPrice, (err, results) => {
  //     if (err) console.log("Error while creating price table: ",err);
  //     else console.log("price table created successfully");
  //   });

  //   mysqlConnection.query(createUser, (err, results) => {
  //     if (err) console.log("Error while creating Users table: ",err);
  //     else console.log("users table created successfully");

  //   });
  //   mysqlConnection.query(createOrder, (err, results) => {
  //     if (err) console.log("Error while creating Orders table: ",err);
  //     else console.log("orders table created successfully");
  //   });



  // // Excuting the SQL statements using loop (for ... of loop with async await) --- Method 2
  // const util = require("util");
  // const query = util.promisify(mysqlConnection.query).bind(mysqlConnection);
  

  // const tableQueries = [
  //   { name: "product", query: createProducts },
  //   { name: "description", query: createProductDescription },
  //   { name: "price", query: createProductPrice },
  //   { name: "user", query: createUser },
  //   { name: "order", query: createOrder },
  // ];

  // async function createTables() {
  //   for (const table of tableQueries) {
  //     try {
  //       await query(table.query);
  //       console.log(`${table.name} table created successfully`);
  //     } catch (err) {
  //       console.log(`Error while creating ${table.name} table:`, err);
  //     }
  //   }
  // }

  // createTables();



  // // Excuting all SQL statements once ---- method 3

  // mysqlConnection.query(createAllTables, (err) => {
  //   if (err) console.log(err);
  //   else console.log("all tables created");
  // });

  res.send(message);
});





/* 
Question 3: 
Create an HTML file called, “index.html” with a form to populate the "products" table you created above.
● The form on the HTML page should send a POST request to a URL named "/add-product"
● Use Express to receive the POST request
● Use the body-parser module to parse the POST request sent to your Express server
● Write a SQL query to insert the data received from the HTML form into the
"products" table
*/
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.post("/add-product", (req, res) => {

  let {
    product_name, 
    product_url, 
    product_brief_description, 
    product_description, 
    product_img, 
    product_link, 
    starting_price, 
    price_range, 
    user_name, 
    user_password} = req.body;


      let insertProduct = `
      INSERT INTO products (product_url,product_name) VALUES (?,?);`;

      mysqlConnection.query(insertProduct,[product_url,product_name], (err, result) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          console.log("Data inserted into product table successfully");
        }
      });

      const selectPID = `
      SELECT product_id FROM products WHERE product_name = "${product_name}"`;

      mysqlConnection.query(selectPID, (err, result) => {
        
        const PId = result[0].product_id;

        if (err) {
          console.log(err);
          res.end(err);
        } else {
          
          let insert_product_des = `
          INSERT INTO product_description(product_id,product_brief_description,product_description,product_img,product_link) VALUES (?,?,?,?,?);`;


          let insert_Product_price = `
          INSERT INTO product_price(product_id,starting_price,price_range) VALUES (?,?,?);`;


          mysqlConnection.query(
            insert_product_des,
            [
              PId,
              product_brief_description,
              product_description,
              product_img,
              product_link,
            ],
            (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                console.log("Data inserted into description table successfully");
              }
            }
          );


          mysqlConnection.query(
            insert_Product_price,
            [PId,starting_price, price_range],
            (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                console.log("Data inserted into Price table successfully");
              }
            }
          );


          let insert_user = `
          INSERT INTO users (user_name, user_password) VALUES (?,?);`;


          mysqlConnection.query(
            insert_user,
            [user_name, user_password],
            (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                console.log("Data inserted into Users table successfully");
              }
            }
          );


          const selectUID = `
          SELECT user_id FROM users WHERE user_name = "${user_name}"`;


          mysqlConnection.query(selectUID,
            (err, result) => {
              
              const UId = result[0].user_id;
               if (err) {
                console.log(err);
                res.end(err);
               } 
               
               else {
                let insert_order = `
                INSERT INTO orders (product_id, user_id)
                VALUES (?,?);`;

                mysqlConnection.query(insert_order,[PId,UId], (err) => {
                       if (err) {
                         console.log(err);
                         res.end(err);
                       } else {
                         console.log(
                           "Data inserted into Orders table successfully"
                         );
                       }
                      });
                }
        })}

        
        res.send("Data inserted successfully");
      });

     
});




// // Bonus question --- select the data from the database tables

const joinQuery = `  
SELECT *
  FROM products
  INNER JOIN product_description ON products.product_id = product_description.product_id
  INNER JOIN product_price ON products.product_id = product_price.product_id
  INNER JOIN orders ON products.product_id = orders.product_id
  INNER JOIN users ON orders.user_id = users.user_id;
`;

mysqlConnection.query(joinQuery, (err, result) => {
  
  if (err) console.log("error:", err);
  else {
    
  // // using for ... in loop

  //   for (let key in result[0]) {
  //     console.log(`${key}: ${result[0][key]}`);
  //   }



    //  // using Object.entries() method

    // Object.entries(result[0]).forEach(([key, value]) => {
    //   console.log(`${key}: ${value}`);
    // });
  }

});

