import {
  saveOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrderById,
} from "../services/orderService.js";


// createing order in DB
export const addOrder = async (req, res) => {
  try {
    
    const status = await saveOrder(req.body);

    if (status === "successfull") {
      res
        .status(201)
        .json({ success: true, message: "Successfully added order" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "error while adding the order" });
    }
  } catch (error) {
    console.error("Error in controller adding order:", error);
    res.status(500).send("Error in controller adding order");
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

// export const updateOrder = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updateOrder = await updateOrderById(id);
//     res
//       .status(200)
//       .json(
//         {
//           success: true,
//           message: "order updated successfully",
//           order: updateOrder,
//         },
//         { new: true }
//       );
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };


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
      .json({ success: true, order:updateOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
