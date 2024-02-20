import {
  saveOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
} from "../services/orderService.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
import { mongoose } from "mongoose";

import { getOneProductService } from "../services/productServices.js";

let orderCounter = 10001;
const generateOrderId = () => {
  try {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");

    const tekiskyMart = "TekiskyMart:";
    const orderId = `${tekiskyMart}${orderCounter}`;

    orderCounter += 1; // Increment the counter for the next order

    return orderId;
  } catch (error) {
    throw new Error("Failed to generate order ID: " + error.message);
  }
};






const sendMessage = async (
  senderNumber,
  recipientNumber,
  productName,
  packetweight,
  unitOfMeasure,
  quantity,
  address,
  totalAmount,
  
) => {
  try {
    const accessToken = process.env.WHATSAPP_TOKEN;
    const baseUrl = "https://tekiskymart.com/";
    const url = "https://graph.facebook.com/v18.0/160700440470778/messages";

    // Construct the message template data
    const templateData = {
      messaging_product: "whatsapp",
      type: "template",
      template: {
        name: "demo",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${productName}`,
              },
              {
                type: "text",
                text: `Weight: ${packetweight} ${unitOfMeasure}`,
              },
              {
                type: "text",
                text: `${quantity}`,
              },
              {
                type: "text",
                text: `${senderNumber}`,
              },
              {
                type: "text",
                text: `${address}`,
              },
              {
                type: "text",
                text: `${totalAmount}`,
              }
            ]
          },
         
        ],
      },
    };

    // Set the request headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    // Set the recipient and data for the message
    const data = { ...templateData, to: recipientNumber };

    // Log the data being sent
    console.log("Sending message with data:", JSON.stringify(data));

    // Send the message using Axios
    const response = await axios.post(url, data, { headers });

    // Log the response
    console.log("WhatsApp API response:", response.data);

    // Check the response status
    if (response.status !== 200) {
      console.error(`WhatsApp API request failed with status code ${response.status}`);
    } else {
      console.log("Message sent successfully!");
    }
  } catch (error) {
    // Log any errors during sending
    console.error("Error sending WhatsApp message:", error.message);
    if (error.response) {
      console.error("WhatsApp API error response:", error.response.data);
    }
  }
};




export const addOrder = async (req, res) => {
  try {
    // Generate a unique order ID
    const uniqueOrderID = generateOrderId(); // Assuming generateOrderId is defined elsewhere

    // Save the order
    const status = await saveOrder({ orderId: uniqueOrderID, ...req.body }); // Assuming saveOrder is defined elsewhere

    // Check if the order was successfully saved
    if (status.success) {
      const {
        mobileNumber,
        customerName,
        productDetails,
        totalAmount,
        address,
        orderId
      } = status.order;
      const additionalNumbers = ["6281017334", "7842363997"];

      // Loop through product details
      for (const productDetail of productDetails) {
        const { productName, packetweight, unitOfMeasure, quantity } =
          productDetail;

        // Send order confirmation message to the customer
        await sendMessage(
          mobileNumber,
          mobileNumber,
          productName,
          packetweight,
          unitOfMeasure,
          quantity,
          address,
          totalAmount,
          orderId
        );

        // Send order confirmation message to junaid sir and umair sir
        // for (const additionalNumber of additionalNumbers) {
        //   await sendMessage(
        //     mobileNumber,
        //     additionalNumber,
        //     customerName,
        //     productName,
        //     packetweight,
        //     unitOfMeasure,
        //     quantity,
        //     address,
        //     totalAmount
        //   );
        // }
      }

      // Respond with success message
      res.status(201).json({
        success: true,
        message: "Successfully added order",
        order: status.order,
      });
    } else {
      // Respond with error message if order was not successfully saved
      res
        .status(400)
        .json({ success: false, message: "Error while adding the order" });
    }
  } catch (error) {
    // Log and respond with error message if an error occurs
    console.error("Error in controller adding order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllOrder = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({ success: true, orders: orders });
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
    res.status(200).json({ success: true, order: updateOrder, updateOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
