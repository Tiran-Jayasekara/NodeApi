const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const Product = require("../models/ProductModels");

module.exports.addProduct = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
  });

  try {
    const {
      name,
      description,
      price,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    } = req.body;
    const { error } = schema.validate({
      name,
      description,
      price,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    });

    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const addProduct = await Product.create({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });

      if (addProduct) {
        res.status(200).json({ message: "Product Add Success", addProduct });
      } else {
        res.status(200).json({ message: "Product Can not add" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});

    if (allProducts) {
      res.status(200).json({ message: "All Products", allProducts });
    } else {
      res.status(400).json({ message: "No Products" });
    }
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

module.exports.deleteProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (deleteProduct) {
      res
        .status(200)
        .json({ message: "Product Delete Success", deleteProduct });
    } else {
      res.status(400).json({ message: "Couldnt find an item " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.productByCatogory = async (req, res) => {
  try {
    const catogory = req.params.catogory;
    const products = await Product.find({ category: catogory });
    if (products.length > 0) {
      res.status(200).json({ message: "Products By Catogory", products });
    } else {
      res
        .status(400)
        .json({ message: "Couldn't find any products by this catogory" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.productById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productById = await Product.find({ _id: productId });

    if (productById) {
      res.status(200).json({ message: "ProductById", productById });
    } else {
      res
        .status(400)
        .json({ message: "Can not find any products for this ID" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateProducts = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
  });

  try {
    const {
      productId,
      name,
      description,
      price,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    } = req.body;

    const { error } = schema.validate({
      name,
      description,
      price,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    });

    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const updateProducts = await Product.findOneAndUpdate(
        { _id: productId },
        {
          name,
          description,
          price,
          category,
          sizes,
          deliveryInfo,
          onSale,
          priceDrop,
          imageUrl,
        },
        { new: true }
      );
      if (updateProducts) {
        res.status(200).json({ message: "Update Success", updateProducts });
      } else {
        res.status(400).json({ message: "Update Unsuccess" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
