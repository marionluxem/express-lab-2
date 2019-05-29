const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static('./public'));

const cartItems = require("./cartItems");
// const cartData = require("./cartData");

app.use("/", cartItems);

const port = 9000;

// run the server
app.listen(port, () => console.log(`Listening at http://localhost:${port}/cart-items`));

