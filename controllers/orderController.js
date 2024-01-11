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
import qs from "querystring";
import https from "https";
import axios from 'axios';

// Function to generate a unique order ID
const generateOrderID = async () => {
  try {
    return new mongoose.Types.ObjectId().toHexString();
  } catch (error) {
    throw new Error("Failed to generate order ID: " + error.message);
  }
};

// Function to make the API call to Alvochat
const makeAPICall = (postData) => {
  return new Promise((resolve, reject) => {
    // ... (existing code remains the same)

    req.write(JSON.stringify(postData)); // Serialize postData to JSON
    req.end();
  });
};



// Function to send a message via Facebook Graph API
const sendMessage = async (mobileNumber) => {
  try {
    const accessToken = 'EAAYubUNY8J4BOwcRXLLvpWsihNbuK58hvOSfUrLFBCSbStKJtChUi78OqO1TneW2rfWTQqw5C5qZAfoUyGFHeDyqSSxKN24Uqop5JeU1ngdtg1tUaHZChjb1ZAlCkfRulscgVm1OZAg2i26WAmPFJHzB2ZBi0CG00gS7RDZC1jqqmHZB45kdhuGJQorspeu3T8R';
    const url = 'https://graph.facebook.com/v17.0/157849150755483/messages';

    const data = {
      messaging_product: 'whatsapp',
      to: mobileNumber,
      type: 'template',
      template: {
        name: 'hello_world',
        language: { code: 'en_US' },
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error sending message: ${error.message}`);
  }
};

export const addOrder = async (req, res) => {
  console.log(req.body.mobileNumber,"Mobile Number For Testing");
  try {
    const uniqueOrderID = await generateOrderID(); // Assuming this function generates a unique ID

    const status = await saveOrder({ orderId: uniqueOrderID, ...req.body });

    if (status === 'successfull') {
  

    // Send a message via Facebook Graph API
      const apiResponse = await sendMessage(req.body.mobileNumber);

      res.status(201).json({ success: true, message: 'Successfully added order', apiResponse });
    } else {
      res.status(400).json({ success: false, message: 'Error while adding the order' });
    }
  } catch (error) {
    console.error('Error in controller adding order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//get prodact services
export const getAllOrder = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ success: true, orders: orders }); // Sending status and orders as an object
  } catch (error) {
    console.error("Error in getting orders:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error in getting orders" });
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
    res
      .status(200)
      .json({ success: true, order: updateOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
