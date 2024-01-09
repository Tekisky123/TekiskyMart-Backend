import Order from "../models/orderModel.js";

let saveOrder = async (data) => {
  try {
    //let { orderId,customerName,mobileNumber, address, products, totalAmount, status,timestamps } = data;
    let order = new Order({...data,status:"order"});
    let result = await order.save();
    if (result) {
      return 'successfull';
    }
  } catch (error) {
    console.error("Error adding order:", error);
    throw new Error("Failed to add order");
  }
  console.log(req);
};

let getAllOrders = async () => {
  try {
    let allOrders = await Order.find();
    console.log(allOrders);
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

let updateOrderById = async (id,updateData) => {
  try {
   // console.log(req.params.id);
    let orderUpdated = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return orderUpdated;
  } catch (err) {
    console.error('Error in updating the  order:', err);
    throw new Error('Error in fetching order');
  }
};


export { saveOrder, getAllOrders, getOrderById, deleteOrderById,updateOrderById};
