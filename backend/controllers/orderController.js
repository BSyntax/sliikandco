import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);

    throw new Error("No order items");
  } else {
    // Validate and fetch product details from database
    const orderItemsWithDetails = [];

    for (const item of orderItems) {
      const productId = item.product || item.id || item._id;

      if (!mongoose.isValidObjectId(productId)) {
        res.status(400);

        throw new Error(`Invalid product ID: ${productId}`);
      }

      const product = await Product.findById(productId);

      if (!product) {
        res.status(404);

        throw new Error(`Product not found: ${productId}`);
      }

      const quantity = item.qty || item.quantity || 1;

      // Check stock availability (Boolean check)
      if (product.inStock === false) {
        res.status(400);

        throw new Error(`Product out of stock: ${product.name}`);
      }

      // Use price from database, not from request
      orderItemsWithDetails.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price, // Use DB price, not client price
        qty: quantity,
      });
    }

    const order = new Order({
      orderItems: orderItemsWithDetails,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Order not found");
  }

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    // Check if user owns this order or is admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      res.status(403);
      throw new Error("Not authorized to view this order");
    }

    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Order not found");
  }

  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Order not found");
  }

  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
