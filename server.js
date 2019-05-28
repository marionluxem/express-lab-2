const express = require("express");
const cartItems = require("./cartItems");
// const cartData = require("./cartData");

const app = express();
app.use(express.json());

app.use("/", cartItems);

const port = 9000;

// run the server
app.listen(port, () => console.log(`Listening at http://localhost:${port}/cart-items`));