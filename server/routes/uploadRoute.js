const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCrtl");
const { isAdmin, authMiddleware } = require("../middlewares/AuthMiddlewares");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/upload-images/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.delete("/delete-images/:id", authMiddleware, isAdmin, deleteImages);


module.exports = router;