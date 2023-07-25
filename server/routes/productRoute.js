const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/AuthMiddlewares");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.put("/upload-images/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);
router.post("/", authMiddleware, isAdmin, createProduct);

module.exports = router;