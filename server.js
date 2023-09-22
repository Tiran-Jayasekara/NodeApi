const express = require("express");
const database = require("./database/database");
const Product = require("./models/ProductModels");
const { mongo } = require("mongoose");

const app = express();
const port = 3000;
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.options("*", cors());

const UserRouter = require("./routes/user");
const AddressRouter = require("./routes/address");
const ProductRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

app.use("/users", UserRouter);
app.use("/address", AddressRouter);
app.use("/products", ProductRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

database()
  .then(() => {
    app.listen(port, () => {
      console.log(`Node JS app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the application on database connection failure
  });
