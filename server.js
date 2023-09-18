const express = require("express");
const database = require("./database/database");
const Product = require("./models/ProductModels");
const { mongo } = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ message: "Data add Successfull" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (product) {
      const LatestProducts = await Product.findById(id);
      res.status(200).json({ message: "Update Successfull", LatestProducts });
    } else {
      res.status(404).json({ message: `can not find any Id with ID ${id}` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message});
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(400).json({ message: "not Founded Id" });
    } else {
      res.status(200).json({ message: "Delete success"});
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

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
