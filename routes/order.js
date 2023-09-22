const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersForAdmin,
  updateOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { verifyAuth } = require("../middleware/authUser");
const { verifyAdmin } = require("../middleware/adminUser");

router.post("/createOrder", verifyAuth, createOrder);
router.get("/getAllOrder/:id", verifyAuth, getAllOrders);
router.get("/getOrderByID/:id", verifyAuth, getOrderById);
router.get("/getAllOrdersForAdmin", verifyAdmin, getAllOrdersForAdmin);
router.put("/updateOrder/:id", verifyAuth, updateOrder);
module.exports = router;
