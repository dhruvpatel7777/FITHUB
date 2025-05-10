const Order = require('../model/Order');
const PlanOrder = require('../model/PlanOrder');
const Product = require('../model/productModel');
const Cart = require('../model/Cart'); // Import Cart model

const addOrder = async (req, res) => {
    try {
        const { user, products, formData, transactionId} = req.body;
        // Destructure the fields from formData
        const { name, address, zipCode, country, phone, email } = formData;
        // Check if each product exists and validate product details
        for (let data of products) {
            const productExists = await Product.findById(data?.productId);
            if (!productExists) {
                return res.status(400).send({ status: false, message: `Product with ID ${data.productId} not found` });
            }
        }
        // Create a new order
        const order = new Order({
            user,
            products, // Use products array with detailed information
            name,
            address,
            zipcode: zipCode,
            country,
            phone,
            email,
            totalamount: products.reduce((acc, item) => acc + item.total, 0), // Calculate total amount from products
            transactionId,
        });
        // Save the order to the database
        await order.save();
        // If the order status is completed, remove all carts associated with the user
            await Cart.deleteMany({ user });
        res.status(201).send({ status: true, message: 'Order added successfully' });
    } catch (error) {
        console.error('Error adding order:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        // Fetch all orders with user details populated
        const orders = await Order.find().populate('user').exec();
        // Filter orders based on payment method
        const onlineOrders = orders.filter(order => order.method === "online");
        const offlineOrders = orders.filter(order => order.method === "cash on delivery");
        // Send the response with all orders, online orders, and offline orders
        res.send({
            status: true,
            orders,
            online: onlineOrders,
            offline: offlineOrders
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).send({
            status: false,
            message: 'Internal server error occurred'
        });
    }
};


const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Define payment methods
        // Fetch all orders for the specific user and populate user details
        const orders = await Order.find({ user: userId }).populate('user').exec();
        // Send the response with all orders, online orders, and offline orders for the specific user
        res.json({
            status: true,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).send({
            status: false,
            message: 'Internal server error occurred'
        });
    }
};

const getPlanOrdersByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        // Define payment methods
        // Fetch all orders for the specific user and populate user details
        const orders = await PlanOrder.find({ user: userId }).populate('user').exec();
        // Send the response with all orders, online orders, and offline orders for the specific user
        res.json({
            status: true,
            planorder:orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).send({
            status: false,
            message: 'Internal server error occurred'
        });
    }
};



// Update an order
const updateOrder = async (req, res) => {
    try {
        const { user, product, cart, status, message } = req.body; // Note: Correct spelling of 'feedback'
        const updateData = {};
        if (user) updateData.user = user;
        if (product) updateData.product = product;
        if (cart) updateData.cart = cart; // Update cart instead of category
        if (status) updateData.status = status;
        if (message) updateData.feedback = message; // Correct spelling
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ status: false, message: 'Order not found' });
        }
        order = await Order.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        res.send({ status: true, order });
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error occurred' });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.send({ status: false, message: 'Order not found' });
        }
        await Order.findByIdAndDelete(req.params.id);
        res.json({ status: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error occurred' });
    }
};



// PlanOrder 

const Planinsertorder = async (req, res) => {
    try {
        const { user, transactionId,plan, name, address, country, phone, email} = req.body;
        // Create a new order
        const planOrder = new PlanOrder({
            user,
            name,
            address,
            country,
            phone,
            email,
            plan,
            transactionId,
        });
        // Save the order to the database
        await planOrder.save();
        // If the order status is completed, remove all carts associated with the user
        res.json({ status: true, message: 'Plan Order added successfully' });
    } catch (error) {
        console.error('Error adding order:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error' });
    }
};



const GetPlanOrders = async (req, res) => {
    try {
        // Fetch all orders with user details populated
        const planorders = await PlanOrder.find().populate('user').exec();
        res.send({
            status: true,
            planorders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).send({
            status: false,
            message: 'Internal server error occurred'
        });
    }
};


// Delete an order
const DeleteOnePlanOrder = async (req, res) => {
    try {
        const order = await PlanOrder.findById(req.params.id);
        if (!order) {
            return res.send({ status: false, message: 'Plan order not found' });
        }
        await PlanOrder.findByIdAndDelete(req.params.id);
        res.json({ status: true, message: 'Plan order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error occurred' });
    }
};



module.exports = {
    addOrder,
    getOrders,
    updateOrder,
    deleteOrder,getOrdersByUserId,


    // PlanOrder 
    Planinsertorder,GetPlanOrders,DeleteOnePlanOrder,getPlanOrdersByUserId

};
