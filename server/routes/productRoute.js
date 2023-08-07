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
  deleteImages,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/AuthMiddlewares");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.put("/upload-images/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);
router.get("/", getAllProduct);
router.post("/", authMiddleware, isAdmin, createProduct);

module.exports = router;