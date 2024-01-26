import Order from "../models/orderModel.js";
import ProductModel from "../models/productModel.js";

import { getOneProduactService } from "./adminServices.js";

const saveOrder = async (data) => {
<<<<<<< HEAD
  
  try {
    
    for(let i=0;i<data.products.length;i++){
      let product=await  getOneProduactService(data.products[i].product)
      console.log(product,"product for order");
      // Find the index of the selected product weight in the productDetails array
      const weightIndex = product.productDetails.findIndex(
        (details) => details.packetweight === data.products[i].packetweight
      );

      // Update the availableStockQty based on the correct index
      product.productDetails[weightIndex].availableStockQty -= parseInt(
        data.products[i].quantity,
        10
      );

      console.log(product.productDetails[weightIndex].availableStockQty);

      // Update the product in the database
      await ProductModel.updateOne(
        { "_id": product._id, "productDetails._id": product.productDetails[weightIndex]._id },
=======
  try {
    for (let i = 0; i < data.products.length; i++) {
      const productId = data.products[i].product;
      

      // Log the productId for debugging purposes
      console.log(`Processing product with ID: ${productId}`);

      const product = await getOneProduactService(productId);

      if (!product) {
        console.error(`Product not found for the given ID: ${productId}`);
        continue; // Skip to the next iteration if the product is not found
      }

      // Assuming availableStockQty is at the top level of the product schema
      product.availableStockQty -= parseInt(data.products[i].quantity, 10);

      // Update the product in the database
      await ProductModel.updateOne(
        { "_id": product._id },
>>>>>>> 10da19b6c6f8924532087acc45b58db53cdbdb62
        {
          $set: {
            "availableStockQty": product.availableStockQty,
          },
        }
      );
    }

<<<<<<< HEAD
    // Create and save the order
=======
>>>>>>> 10da19b6c6f8924532087acc45b58db53cdbdb62
    const order = new Order({ ...data });
    const result = await order.save();

    if (result) {
<<<<<<< HEAD
      console.log('Order added successfully');
      return 'successful';
=======
      console.log('Order added successfully:', result);
      return 'successfull';
>>>>>>> 10da19b6c6f8924532087acc45b58db53cdbdb62
    }
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Failed to add order");
  }
};


let getAllOrders = async () => {
  try {
    let allOrders = await Order.find();

    return allOrders;
  } catch (err) {
    console.error('Error in fetching orders:', err);
    throw new Error('Error in fetching orders');
  }
};

let getOrderById = async (id) => {
  try {
    console.log(id);
    let order = await Order.findById(id);
    return order;
  } catch (err) {
    console.error('Error in fetching order:', err);
    throw new Error('Error in fetching order');

  }
};

let deleteOrderById = async (id) => {
  try {
    //console.log(req.params.id);
    let orderDeleted = await Order.findByIdAndDelete(id);
    return orderDeleted;
  } catch (err) {
    console.error('Error in deleting the  orders:', err);
    throw new Error('Error in deleting orders');
  }
};

let updateOrderById = async (id, updateData) => {
  try {
    // console.log(req.params.id);
    let orderUpdated = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return orderUpdated;
  } catch (err) {
    console.error('Error in updating the  order:', err);
    throw new Error('Error in fetching order');
  }
};


export { saveOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById };
