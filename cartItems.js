const express = require("express");
// const cartData = require("./cartData");
const cartItems = express.Router();

const pg = require("pg");
const pool = new pg.Pool({
    user: "postgres",
    password: "MA08rD07on",
    host: "localhost",
    port: 5432,
    database: "ExpressShopDB",
    ssl: false
});

cartItems.get("/cart-items", (req, res) => {
    pool.query("SELECT * FROM shoppingcart;")
        .then((result) => {
            res.send(result.rows);
        });
    // console.log(req.body); 
});

// cartItems.get("/cart-items/:id", (req, res) => {
//     let index = req.params.id;
 
//     if (cartData[index]) {
//         res.send(cartData[index]);
//     } else {
//         res.send('Item not found');
//     }
//  });

cartItems.post("/cart-items", (req, res) => {
    let cartData = req.body; // <-- Get the parsed JSON body
    let sql = "INSERT INTO shoppingcart(id, price, product, quantity) " +
    "VALUES ($1::int, $2::real, $3::text, $4::int)";
 
    let values = [cartData.id, cartData.price, cartData.product, cartData.quantity];
    pool.query(sql, values).then((result) => {
    res.status(201); // 201 Created
    res.send("INSERTED");
    });
});

cartItems.put("/cart-items/:id", (req, res) => {
    let id = req.params.id;
    let cartData = req.body;

    let product = cartData.product;

    let sql = "UPDATE shoppingcart SET price=$1::real, product=$2::text, quantity=$3::int WHERE id=$4::int"
    let values = [cartData.price, cartData.product, cartData.quantity, id];
    
    pool.query(sql, values)
        .then((result) => {
        res.status(201); // 201 Created
        res.send("UPDATED");
    });
});

cartItems.delete("/cart-items/:id", (req, res) => {
    // console.log(req.params.id); 
    // res.send("Deleting an item..");

    let id = req.params.id;
    let cartData = req.body;

    // let product = cartData.product;

    let sql = "DELETE FROM shoppingcart WHERE id=$1::int"
    // let sql = "DELETE FROM shoppingcart SET price=$1::real, product=$2::text, quantity=$3::int WHERE id=$4::int"
    let values = [cartData.id];
    
    pool.query(sql, values)
        .then((result) => {
        res.status(204); // No Content
        res.send("DELETED");
    });
});

module.exports = cartItems;