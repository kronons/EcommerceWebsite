const express = require("express");
const { createCoupon, getAllCoupons, updateCoupons, deleteCoupon } = require("../controller/couponCrtl");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, isAdmin, getAllCoupons);
router.put("/:id", authMiddleware, isAdmin, updateCoupons);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);


module.exports = router;