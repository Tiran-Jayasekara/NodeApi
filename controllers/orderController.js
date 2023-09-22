const Joi = require("joi").extend(require("@joi/date"));
const express = require("express");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const app = express();
app.use(express.json());

module.exports.createOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, isProcessing } = req.body;
    const order = await Order.create({
      user,
      orderItems,
      shippingAddress,
      isProcessing,
    });
    if (order) {
      res.status(200).json({ message: "Order Success", order });
      await Cart.deleteMany({ userID: user });
    } else {
      res.status(400).json({ message: "Order Unsuccess" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const userid = req.params.id;
    const getAllItems = await Order.find({ user: userid }).populate(
      "orderItems.product"
    );
    console.log(getAllItems);
    if (getAllItems) {
      res.status(200).json({ message: "All Items", getAllItems });
    } else {
      res.status(400).json({ message: "There is somthing Wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate("orderItems.product")
      .populate("user");
    if (allOrders) {
      res.status(200).json({ message: "get All Orders for Admin", allOrders });
    } else {
      res.status(400).json({ message: "No Any Orders" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const getOrder = await Order.findById(id);
    if (getOrder) {
      res.status(200).json({ message: "Get Order By ID", getOrder });
    } else {
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { orderItems, shippingAddress, isProcessing } = req.body;
    const updateData = await Order.findOneAndUpdate(
      {
        _id: id,
      },
      {
        orderItems,
        shippingAddress,
        isProcessing,
      }
    );
    if (updateData) {
      res.status(200).json({ message: "Update Success", updateData });
    } else {
      res.status(400).json({ message: "Update UnSuccess" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
