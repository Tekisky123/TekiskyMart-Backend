<<<<<<< HEAD
import Order from "../models/orderModel.js";
=======
import OrderModel from "../models/orderModel.js";
>>>>>>> 436e331ea0af7bdd9411ada13a36b5a43861316b
import ProductModel from "../models/productModel.js";
import { getOneProductService } from "./productServices.js";

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
    // Check if products array exists and is iterable
    if (!data.products || !Array.isArray(data.products)) {
      throw new Error('Products array is missing or not iterable');
    }

    const productsDetails = [];

    for (const orderDetails of data.products) {
      const productId = orderDetails.product;

      try {
        const productInfo = await getOneProductService(productId);

<<<<<<< HEAD
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
=======
        if (!productInfo) {
          console.error(`Product details not found for the given ID: ${productId}`);
          continue;
>>>>>>> 436e331ea0af7bdd9411ada13a36b5a43861316b
        }

        const availableStockQty = productInfo.availableStockQty - orderDetails.quantity;

        // Update the product's availableStockQty
        await ProductModel.updateOne(
          { "_id": productId },
          {
            $set: {
              "availableStockQty": availableStockQty,
            },
          }
        );

        const productDetail = {
          productName: productInfo.productName,
          imageURL: productInfo.imageURL,
          packetweight: productInfo.packetweight,
          unitOfMeasure:productInfo.unitOfMeasure,
          description: productInfo.description,
          mrp: productInfo.mrp,
          offerPrice:productInfo.offerPrice,
          createdBy: productInfo.createdBy, 
          quantity:orderDetails.quantity 
        };

        // Push the product details to the array
        productsDetails.push(productDetail);

        // Debugging: Log the product details
        console.log('Product Details:', productDetail);
      } catch (updateError) {
        console.error(`Error updating product: ${updateError.message}`);
        throw new Error('Failed to update product');
      }
    }

<<<<<<< HEAD
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
=======
    // Check if all required fields in productDetails are present
    if (productsDetails.some(product => !product.createdBy || !product.mrp || !product.description || !product.packetweight || !product.productName ||!product.unitOfMeasure  )) {
      throw new Error('Missing required fields in productDetails');
>>>>>>> 436e331ea0af7bdd9411ada13a36b5a43861316b
    }

    data.productDetails = productsDetails;

    const newOrder = new OrderModel(data);  
    const savedOrder = await newOrder.save();

    return { success: true, order: savedOrder };
  } catch (error) {
    console.error('Error while adding the order:', error);
    return { success: false, message: error.message || 'Error processing order' };
  }
};
export default saveOrder;


let getAllOrders = async () => {
  try {
    let allOrders = await OrderModel.find();

    return allOrders;
  } catch (err) {
    console.error('Error in fetching orders:', err);
    throw new Error('Error in fetching orders');
  }
};

let getOrderById = async (id) => {
  try {

    let order = await OrderModel.findById(id);
    return order;
  } catch (err) {
    console.error('Error in fetching order:', err);
    throw new Error('Error in fetching order');

  }
};

let deleteOrderById = async (id) => {
  try {
    //console.log(req.params.id);
    let orderDeleted = await OrderModel.findByIdAndDelete(id);
    return orderDeleted;
  } catch (err) {
    console.error('Error in deleting the  orders:', err);
    throw new Error('Error in deleting orders');
  }
};

let updateOrderById = async (id, updateData) => {
  try {
    // console.log(req.params.id);
    let orderUpdated = await OrderModel.findByIdAndUpdate(id, updateData, { new: true });
    return orderUpdated;
  } catch (err) {
    console.error('Error in updating the  order:', err);
    throw new Error('Error in fetching order');
  }
};


export { saveOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById };
