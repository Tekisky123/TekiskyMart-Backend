import Order from "../models/orderModel.js";

let saveOrder = async (req, res) => {
  try {
    let { mobileNumber, address, products, totalAmount, status } = req.body;
    let order = new Order({
      mobileNumber,
      address,
      products,
      totalAmount,
      status,
    });
    let result = await order.save();
    console.log(order);
    if (result) {
      res.send("success");
    }
  } catch (error) {
    console.log("error in service");
    console.log(error);
  }
  console.log(req.body);
};

let getAllOrders = async (req, res) => {
  try {
    let allOrders = await Order.find();
    console.log(allOrders);
    res.status(200).send(allOrders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

let getOrderById = async (req, res) => {
  try {
    console.log(req.params.id);
    let order = await Order.findById(req.params.id);
    res.status(200).send(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

let deleteOrderById = async (req, res) => {
  try {
    console.log(req.params.id);
    let orderDeleted = await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server error");
  }
};

let updateOrderById = async (req, res) => {
  try {
    console.log(req.params.id);
    let orderUpdated = await Order.findByIdAndUpdate(req.params.id);
    res.status(200).send("updated succsfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server error");
  }
};

export { saveOrder, getAllOrders, getOrderById, deleteOrderById,updateOrderById};
