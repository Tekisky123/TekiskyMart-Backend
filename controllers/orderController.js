import {
  saveOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
} from "../services/orderService.js";

import { mongoose } from 'mongoose';
import qs from "querystring";
import https from "https";

// Function to generate a unique order ID
const generateOrderID = async () => {
  try {
    return new mongoose.Types.ObjectId().toHexString();
  } catch (error) {
    throw new Error("Failed to generate order ID: " + error.message);
  }
};

// Function to make the API call
const makeAPICall = (postData) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      hostname: "api.alvochat.com",
      port: null,
      path: "api.alvochat.com/instance1199/messages/chat",
      headers: {
        "content-type": "application/json"
      }
    };

    const req = https.request(options, (res) => {
      let chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        const responseBody = body.toString();
        console.log(responseBody); // Log the API response if needed
        resolve(responseBody); // Resolve the promise with the API response
      });
    });

    req.on("error", (error) => {
      console.error("Error making API request:", error);
      reject("Error making API request: " + error.message); // Reject the promise with the API error
    });

    req.write(JSON.stringify(postData)); // Serialize postData to JSON
    req.end();
  });
};

export const addOrder = async (req, res) => {
  try {
    const uniqueOrderID = await generateOrderID();

    const status = await saveOrder({ orderId: uniqueOrderID, ...req.body });

    if (status === "successfull") {
      const apiResponse = await makeAPICall({
        token: process.env.WHATSAPP_TOKEN,
        to: 8263964373,
        body: "WhatsApp API on alvochat.com works good",
        priority: "",
        preview_url: "",
        message_id: ""
      });

      res.status(201).json({ success: true, message: "Successfully added order", apiResponse });
    } else {
      res.status(400).json({ success: false, message: "Error while adding the order" });
    }
  } catch (error) {
    console.error("Error in controller adding order:", error);
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
