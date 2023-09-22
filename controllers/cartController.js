const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const app = express();
app.use(express.json());
const Cart = require("../models/cartModel");

module.exports.addToCart = async (req, res) => {
  const AddToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required(),
  });

  try {
    const { userID, productID, quantity } = req.body;
    const { error } = AddToCart.validate({
      userID,
      productID,
    });

    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      const alreadyExsist = await Cart.find({
        userID: userID,
        productID: productID,
      });
      if (alreadyExsist.length > 0) {
        res.status(400).json({
          message:
            "Product is already added to the cart! please add different products",
        });
      } else {
        const addCart = await Cart.create({
          userID,
          productID,
          quantity,
        });
        if (addCart) {
          res.status(200).json({ message: "Add to Cart Success", addCart });
        } else {
          res.status(400).json({ message: "Unsuccess" });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllCartItems = async (req, res) => {
  try {
    const userId = req.params.id;
    const cartItems = await Cart.find({ userID: userId }).populate("productID");
    if (cartItems.length > 0) {
      res.status(200).json({ message: "All Cart Items", cartItems });
    } else {
      res.status(400).json({ message: "Can Not find any cart Items" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deleteItem = await Cart.findByIdAndDelete(itemId);
    if (deleteItem) {
      res.status(200).json({ message: "Delete Success", deleteItem });
    } else {
      res.status(400).json({ message: "Delete UnSuccess" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
