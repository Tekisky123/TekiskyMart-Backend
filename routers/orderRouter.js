import express from "express";
import { saveOrder,getAllOrders,getOrderById,deleteOrderById,updateOrderById} from "../services/orderService.js";
let orderRoute=express.Router();
orderRoute.post("/saveOrder",saveOrder);
orderRoute.get("/getAllOrders",getAllOrders);
orderRoute.get("/getOrderById/:id",getOrderById)
orderRoute.delete("/deleteOrderById/:id",deleteOrderById)
orderRoute.put("/updateOrderById/:id",updateOrderById)
export default orderRoute;
