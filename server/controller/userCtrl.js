const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const {generateRefreshToken} = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const crypto = require ("crypto");

// Create a User
const createUser = asyncHandler(
    async( req, res ) => {
    const email = req.email;
    const findUser = await User.findOne({ email: email });

    if(!findUser) {

        // Create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {

        // User already exists
         throw new Error("User Already Exists");
    }
});

// Login a User
const loginUserCtrl = asyncHandler(async ( req, res ) => {
    const { email, password } = req.body;

    // check if user exists or not
    const findUser = await User.findOne({ email });

    if (findUser && await findUser.isPasswordMatched(password)) {
      const refreshToken = await generateRefreshToken(findUser?._id);
      const updateuser = await User.findByIdAndUpdate(findUser.id, {
        refreshToken : refreshToken,
      },
      { new : true }
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 72  * 60 * 60 * 1000,
      })

      res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            address: findUser?.address,
            cart: findUser?.cart,
            wishlist: findUser?.wishlist,
            token: generateToken(findUser?.id),
        })
    } else {
        throw new Error("Invalid Creentials");
    }
});

// Admin Login
const loginAdmin = asyncHandler(async ( req, res ) => {
  const { email, password } = req.body;

  // check if user exists or not
  const findAdmin = await User.findOne({ email });

  if (findAdmin.role !== "admin") throw new Error("Not Authorized");

  if (findAdmin && await findAdmin.isPasswordMatched(password)) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(findAdmin.id, {
      refreshToken : refreshToken,
    },
    { new : true }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 72  * 60 * 60 * 1000,
    })

    res.json({
          _id: findAdmin?._id,
          firstname: findAdmin?.firstname,
          lastname: findAdmin?.lastname,
          email: findAdmin?.email,
          mobile: findAdmin?.mobile,
          token: generateToken(findAdmin?.id),
      })
  } else {
      throw new Error("Invalid Creentials");
  }
});

// Handle refresh token
const handleRefreshToken = asyncHandler(async ( req, res ) => {
  const cookie = req.cookies;

  if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if(!user) throw new Error("No Refresh Token in Database or Token Does Not Match");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if(err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token")
      }
      const accessToken = generateToken(user?._id)
      res.json({ accessToken });
    });
});

// Logout Functionality
const logout = asyncHandler(async ( req, res ) => {
  const cookie = req.cookies;

  if(!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if(!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); //Forbidden
  }
  await User.findOneAndUpdate({ refreshToken: refreshToken }, {
    refreshToken: "",
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); //Forbidden
});

// Update a user
const updatedUser = asyncHandler(async(req,res) => {
    const { _id } = req.user
    validateMongoDbId(_id);

    try{
        const updatedUser = await User.findByIdAndUpdate(
            _id, 
            {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
            },
        {
            new: true,
        }
        );
        res.json(updatedUser);
    }
    catch(error){
        throw new Error(error);
    }
});

// Save User Address
const saveAddress = asyncHandler(async( req, res, next ) =>{
  const { _id } = req.user
  validateMongoDbId(_id);

  try{
    const updatedUser = await User.findByIdAndUpdate(
        _id, 
        {
        address: req?.body?.address,
        },
    {
        new: true,
    }
    );
    res.json(updatedUser);
  }
  catch(error){
      throw new Error(error);
  }

});

// Get all users
const getallUser = asyncHandler(async(req,res) => {
    try{
        const getUsers =  await User.find();
        res.json(getUsers);
    }
    catch(error) {
        throw new Error(error);
    }
})

// Get a single user
const getaUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try{
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        })
    }
    catch(error) {
        throw new Error(error);
    }
})

// Delete a single user
const deleteaUser = asyncHandler(async(req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try{
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        })
    }
    catch(error) {
        throw new Error(error);
    }
})

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      res.json({
        message: 'User Blocked',
        user: user,
      });
    } catch (error) {
      // Handle the error appropriately (e.g., log or send an error response)
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });

  const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      res.json({
        message: 'User Unblocked',
        user: user,
      });
    } catch (error) {
      // Handle the error appropriately (e.g., log or send an error response)
      console.error(error);
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  });

  const updatePassword = asyncHandler (async ( req, res ) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);

    if ( password ) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    }
    else {
      res.json(user);
    }
  });

  const forgotPasswordToken = asyncHandler(async( req, res ) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if(!user) throw new Error("User not found with this email.");
    try{
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hi, please click the following link to reset your password. The link will be valid for only 10 minutes. <a href="http://localhost:5000/api/user/reset-password/${token}">Click Here</a>`
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        html: resetURL,
      };
      sendEmail(data);
      res.json(token);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const resetPassword = asyncHandler(async ( req, res ) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpired: { $gt: Date.now() },
    });
  
    if (!user) {
      throw new Error("Token Expired, Please try again later.");
    }
  
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;
    await user.save();
  
    res.json(user);
  });

  const getWishList = asyncHandler(async( req, res ) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const userCart = asyncHandler(async( req, res ) => {
    const { cart } = req.body;
    const { _id } =  req.user;
    validateMongoDbId(_id);

    try {
      let products = [];
      const user = await User.findById(_id);
      // Check if user already has products in cart
      const alreadyExistCart = await Cart.findOne({ orderby: user._id });
      if ( alreadyExistCart) {
        alreadyExistCart.remove();
      }
      for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        let getPrice = await Product.findById(cart[i]._id).select("price").exec();
        object.price = getPrice.price;
        products.push(object);
      };
      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
      let newCart = await new Cart({
        products,
        cartTotal,
        orderby: user?._id,
      }).save();
      res.json(newCart);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const getUserCart = asyncHandler(async ( req, res ) => {
    const { _id} = req.user;
    validateMongoDbId(_id);
    try {
      const cart = await Cart.findOne({ orderby: _id }).populate("products.product");
      res.json(cart);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const emptyCart = asyncHandler(async( req, res ) => {
    const { _id} = req.user;
    validateMongoDbId(_id);
    try {
      const user = await User.findOne({ _id });
      const cart = await Cart.findOneAndRemove({orderby: user._id});
      res.json(cart);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const applyCoupon = asyncHandler(async( req, res ) => {
    const { coupon } = req.body;
    const { _id} = req.user;
    validateMongoDbId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    console.log(validCoupon);

    if (validCoupon == null) {
      throw new Error("Invalid Coupon,");
    }
    const user = await User.findOne({ _id });
    let { products, cartTotal } = await Cart.findOne({ 
      orderby: user._id, 
    }).populate("products.product");
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount / 100 ).toFixed(2));
    await Cart.findOneAndUpdate({orderby : user._id}, {totalAfterDiscount}, {new : true});
    res.json(totalAfterDiscount);
  });

  const createOrder = asyncHandler(async( req, res) => {
    const { _id} = req.user;
    validateMongoDbId(_id);
    const {COD, couponApplied} = req.body;

    try {
      if(!COD) throw new Error("Create cash order failed");
      const user = await User.findById(_id);
      let userCart = await Cart.findOne({orderby : user._id});
      let finalAmount = 0;
      if(couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount;
      }
      else {
        finalAmount = userCart.cartTotal; 
      }
      let newOrder = await Order({
        products: userCart.products,
        paymentIntent: {
          id: uniqid(),
          method: "COD",
          amount: finalAmount,
          status: "Cash on delivery",
          created: Date.now(),
          currency: "usd",
        },
        orderby: user._id,
        orderStatus: "Cash on delivery",
      }).save();
      let update = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count} },
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});
      res.json({ message: "success" });
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const getOrders = asyncHandler(async ( req, res ) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const userOrders = await Order.findOne({ orderby: _id })
      .populate("products.product")
      .populate("orderby")
      .exec();
      
      res.json(userOrders);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const getAllOrders = asyncHandler(async ( req, res ) => {

    try {
      const allUserOrders = await Order.find()
      .populate("products.product")
      .populate("orderby")
      .exec();
      
      res.json(allUserOrders);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const getOrderByUserId = asyncHandler(async ( req, res ) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
      const userOrders = await Order.findOne({ orderby: id })
      .populate("products.product")
      .populate("orderby")
      .exec();
      
      res.json(userOrders);
    }
    catch (error) {
      throw new Error(error);
    }
  });

  const updateOrderStatus = asyncHandler(async( req, res ) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);

    try {
      const updateOrderStatus = await Order.findByIdAndUpdate(
        id, 
        {
          orderStatus: status,
          paymentIntent: {
            status: status,
          }
        },
        {
           new: true
        },
      );
      res.json(updateOrderStatus);
    }
    catch (error) {
      throw new Error(error);
    }
  });

module.exports = { 
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser,
    updatedUser,
    blockUser,
    unblockUser, 
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
    getAllOrders,
    getOrderByUserId,
};