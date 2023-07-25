const express = require('express');

const { 
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
     } 
= require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.put("/password", authMiddleware, updatePassword);
router.put("/reset-password/:token", authMiddleware, resetPassword);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.post("/cart/cash-order", authMiddleware, createOrder);
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);


router.get("/all-users", getallUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getaUser);

router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);

module.exports = router;