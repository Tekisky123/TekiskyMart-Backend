import {
  saveOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
} from "../services/orderService.js";
import dotenv from 'dotenv';
dotenv.config()
import { mongoose } from 'mongoose';

import { getOneProduactService } from "../services/adminServices.js";

// Function to generate a unique order ID
const generateOrderID = async () => {
  try {
    return new mongoose.Types.ObjectId().toHexString();
  } catch (error) {
    throw new Error("Failed to generate order ID: " + error.message);
  }
};




export const addOrder = async (req, res) => {

  try {
    const uniqueOrderID = await generateOrderID(); // Assuming this function generates a unique ID

    const status = await saveOrder({ orderId: uniqueOrderID, ...req.body });

    if (status === 'successfull') {
      res.status(201).json({ success: true, message: 'Successfully added order', });
    } else {
      res.status(400).json({ success: false, message: 'Error while adding the order' });
    }
  } catch (error) {
    console.error('Error in controller adding order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await getAllOrders();

    // Create an array to store detailed product information for each order
    const ordersWithDetails = [];

    for (const order of orders) {
      // Create an array to store product details for the current order
      const productsDetails = [];

      for (const orderDetails of order.products) {
        const productId = orderDetails.product;
        const productInfo = await getOneProduactService(productId);

        // Extract product details for each item in the productDetails array
        const productDetailsArray = productInfo.productDetails.map((details) => ({
          productName:productInfo.productName,
          imageURL: productInfo.imageURL,
          packetweight: details.packetweight,
          description: productInfo.description,
          mrp: details.mrp,
          quantity: orderDetails.quantity,
        }));

        // Add product details to the array
        productsDetails.push(...productDetailsArray);
      }

      // Add the productsDetails array to the order object
      const orderWithDetails = { ...order.toObject(), productsDetails };
      ordersWithDetails.push(orderWithDetails);
    }
    
    res.status(200).json({ success: true, orders: ordersWithDetails });
  } catch (error) {
    console.error("Error in getting orders:", error);
    res.status(500).json({ status: "error", message: "Error in getting orders" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;

    // Assuming req.body contains the updated data for the order
    const updateData = req.body;

    const updatedOrder = await updateOrderById(id, updateData);

    if (updatedOrder) {
      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: updatedOrder,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteOrder = await deleteOrderById(id);
    res
      .status(200)
      .json({ success: true, message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById1 = async (req, res) => {
  try {
    const id = req.params.id;
    const updateOrder = await getOrderById(id);

    // Create an array to store product details
    const productsDetails = [];

    for (const orderDetails of updateOrder.products) {
      const productId = orderDetails.product;
      const productInfo = await getOneProduactService(productId);

      // Extract product details for each item in the productDetails array
      const productDetailsArray = productInfo.productDetails.map((details) => ({
        product:productInfo.productName ,
        imageURL: productInfo.imageURL,
        packetweight: details.packetweight,
        description: productInfo.description,
        mrp: details.mrp,
        quantity: orderDetails.quantity,
      }));

      // Add product details to the array
      productsDetails.push(...productDetailsArray);
    }
 

    res.status(200).json({ success: true, order: updateOrder, "desc": productsDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
