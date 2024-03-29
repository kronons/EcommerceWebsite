const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require('../utils/validateMongodbId');


const createProduct = asyncHandler (async (req, res) => {

    try{
        // Cuts and combines brand with category
        if( req.body.title ) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create( req.body );
        res.json( newProduct );
    }
    catch (error) {
        throw new Error( error );
    }

});

const updateProduct = asyncHandler(async ( req, res ) => {
    const { id } = req.params; // Extract the 'id' parameter
    try {
      if ( req.body.title ) {
        req.body.slug = slugify( req.body.title );
      }
      const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
      res.json(updatedProduct);
    } catch ( error ) {
      throw new Error( error );
    }
  });
  
  const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the 'id' parameter
    try {
      const deletedProduct = await Product.findOneAndDelete({ _id: id });
      res.json( deletedProduct );
    } catch (error) {
      throw new Error( error );
    }
  });

const getaProduct = asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id).populate("color");
        res.json( findProduct );
    }
    catch (error) {
        throw new Error( error );
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering Products
    const filter = { ...req.query }; // Copy all query parameters to the filter object
    const excludeFields = [ "page", "sort", "limit", "fields" ] 
    excludeFields.forEach( el => delete filter[el] );

    let queryStr = JSON.stringify(filter);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if ( req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); // Split the fields by commas and join with spaces
      query = query.sort(sortBy);
    }
    else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' '); // Split the fields by commas and join with spaces
      query = query.select(fields);
    }
    else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if(req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error ("This page does not exists.");
      }
    }

    const product = await query;
    res.json(product);
  } catch ( error ) {
    throw new Error( error );
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id, firstname, lastname } = req.user;
  const { star, prodId, comment } = req.body;

  console.log(_id, firstname, lastname);
  console.log(star, prodId, comment);

  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedbyId.toString() === _id.toString()
    );

    if (alreadyRated) {
      // Handle case when the user has already rated the product
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated }
        },
        {
          $set: { "ratings.$.star" : star, "ratings.$.comment" : comment },
        },
        {
          new : true,
        },
      );
    } else {
      // Handle case when the user successfully rates the product
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedbyId: _id,
              postedby: firstname + " " +  lastname,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getAllRatings = await Product.findById(prodId);
    let totalrating = getAllRatings.ratings.length;
    let ratingsum = getAllRatings.ratings.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round( ratingsum / totalrating );
    let finalProductRating = await Product.findByIdAndUpdate(prodId, 
      {
        totalrating : actualRating,
      }, 
      {
        new: true,
      }
    );
    res.json(finalProductRating);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createProduct , getaProduct , getAllProduct, updateProduct, deleteProduct, rating };