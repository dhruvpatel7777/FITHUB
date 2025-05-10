const express=require('express');
const { createCart, getAllCarts, updateCart, deleteCart, getCartById } = require('../controller/cartController');
const router=express.Router();
const authMiddleware = require("../middleware/auth_middleware");

// Cart
router.post('/addtocart', createCart);
router.get('/getcarts', getAllCarts);
router.get('/getCartById',authMiddleware, getCartById);
router.delete('/deletecart/:id', deleteCart);
router.put('/updatecart/:id',updateCart);

module.exports=router;

