const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = asyncHandler (async( req, res ) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    }
    catch ( error ) {
        throw new Error(error);
    }
});

const updateBlog = asyncHandler (async( req, res ) => {
    const { id } = req.params;
    validateMongoDbId( id );
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body,{new:true});
        res.json(updateBlog);
    }
    catch ( error ) {
        throw new Error(error);
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBlog = await Blog.findById(id)
            .populate("likes")
            .populate("dislikes");
        const updateViews = await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 },
            },
            { new: true }
        );
        res.json(getBlog);
    } catch (error) {
        throw new Error(error);
    }
});

const getAllBlogs = asyncHandler (async( req, res ) => {
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    }
    catch ( error ) {
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler (async( req, res ) => {
    const { id } = req.params;
    validateMongoDbId( id );
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    }
    catch ( error ) {
        throw new Error(error);
    }
});

const likedBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
  
    try {
      const blog = await Blog.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      const loggedInUserId = req.user?._id;
  
      const alreadyDisliked = blog.dislikes.find(
        (userId) => userId.toString() === loggedInUserId.toString()
      );
  
      if (alreadyDisliked) {
        blog.dislikes.pull(loggedInUserId);
        blog.isDisliked = false;
      }
  
      const alreadyLiked = blog.likes.find(
        (userId) => userId.toString() === loggedInUserId.toString()
      );
  
      if (alreadyLiked) {
        blog.likes.pull(loggedInUserId);
        blog.isLiked = false;
      } else {
        blog.likes.push(loggedInUserId);
        blog.isLiked = true;
      }
  
      await blog.save();
  
      res.json(blog);
    } catch (error) {
      throw new Error(error);
    }
  });

const dislikedBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const loggedInUserId = req.user?._id;

    const alreadyLiked = blog.likes.find(
      (userId) => userId.toString() === loggedInUserId.toString()
    );

    if (alreadyLiked) {
      blog.likes.pull(loggedInUserId);
      blog.isLiked = false;
    }

    const alreadyDisliked = blog.dislikes.find(
      (userId) => userId.toString() === loggedInUserId.toString()
    );

    if (alreadyDisliked) {
      blog.dislikes.pull(loggedInUserId);
      blog.isDisliked = false;
    } else {
      blog.dislikes.push(loggedInUserId);
      blog.isDisliked = true;
    }

    await blog.save();

    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async ( req, res ) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try{
    const uploader = (path) => cloudinaryUploadImg( path, "images" );
    const urls = [];
    const files = req.files;
    for ( const file of files ) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(id, {
      images: urls.map((file) => {
        return file;
      }),
    },
    {
      new: true,
    }
  );
  res.json(findBlog);
  }
  catch (error) {
    throw new Error(error);
  }
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likedBlog, dislikedBlog, uploadImages };