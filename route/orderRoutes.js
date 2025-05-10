const express=require('express');
const router=express.Router();
const authMiddleware = require("../middleware/auth_middleware");
const { addOrder, getOrders, updateOrder, deleteOrder, getOrdersByUserId, Planinsertorder, GetPlanOrders, DeleteOnePlanOrder, getPlanOrdersByUserId } = require('../controller/orderController');

// Order
router.post('/insertorder', addOrder);
router.get('/getorders', getOrders);
router.get('/getordersById',authMiddleware, getOrdersByUserId);
router.delete('/deleteorder/:id', deleteOrder);
router.put('/updateorder/:id',updateOrder);

// Plan Order
router.post('/planinsertorder', Planinsertorder);
router.get('/getplanorders', GetPlanOrders);
router.get('/getplanordersById',authMiddleware, getPlanOrdersByUserId);
router.delete('/deleteplanorder/:id', DeleteOnePlanOrder);
router.put('/updateorder/:id',updateOrder);

module.exports=router;

