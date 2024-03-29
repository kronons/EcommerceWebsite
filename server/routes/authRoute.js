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
        addToWishList,
        getWishList,
        saveAddress,
        addAndUpdateCart,
        getUserCart,
        emptyCart,
        applyCoupon,
        createOrder,
        getOrders,
        updateOrderStatus,
        getAllOrders,
        removeProductFromCart,
        updateProductQuantityFromCart,
        getMyOrders,
        getOrderByOrderId,
        getMonthlyStatistics,
        getYearlyStatistics,
     } 
= require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.put("/password", authMiddleware, updatePassword);
router.put("/reset-password/:token", resetPassword);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/cart", authMiddleware, addAndUpdateCart);
router.put("/wishlist", authMiddleware, addToWishList);


router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/get-order-by-order-id/:id", authMiddleware, isAdmin, getOrderByOrderId);

router.get("/all-users", getallUser);
router.get("/get-my-orders", authMiddleware, getMyOrders);
router.get("/get-orders", authMiddleware, isAdmin, getOrders);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.get("/get-monthly-statistics", authMiddleware, getMonthlyStatistics);
router.get("/get-yearly-statistics", authMiddleware, getYearlyStatistics);
router.get("/:id", authMiddleware, isAdmin, getaUser);

router.delete("/cart-update-quantity/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.delete("/cart-remove-product/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/cart-empty/:cartId", authMiddleware, emptyCart);
router.delete("/:id", deleteaUser);

module.exports = router;