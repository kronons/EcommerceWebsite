const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);
router.post("/", authMiddleware, isAdmin, createProduct);

module.exports = router;