const express = require("express");
const {
  addToCart,
  getAllCartItems,
  deleteCartItem,
} = require("../controllers/cartController");
const router = express.Router();

const { verifyAuth } = require("../middleware/authUser");

router.post("/addToCart", verifyAuth, addToCart);
router.get("/getCartItems/:id", verifyAuth, getAllCartItems);
router.get("/deleteCartItems/:id", verifyAuth, deleteCartItem);

module.exports = router;
