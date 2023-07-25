const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddlewares");
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likedBlog, dislikedBlog, uploadImages } = require("../controller/blogCrtl");
const { blogImgResize, uploadPhoto} = require("../middlewares/uploadImages");
const router = express.Router();


router.put("/upload-images/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), blogImgResize, uploadImages);
router.post("/", authMiddleware, isAdmin, createBlog);
router.put("/likes", authMiddleware, likedBlog)
router.put("/disLikes", authMiddleware, dislikedBlog)
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlogs);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);


module.exports = router;