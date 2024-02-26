import {
  addCustomerNumberController,
  updateCustomer,
  deleteCustomer,
  getAllDetails,
} from "../controllers/customerController.js";
import express from "express";
import authenticateToken from "../authentication/userAuth.js";

let customerRoutes = express.Router();

customerRoutes.post("/number", authenticateToken, addCustomerNumberController);
customerRoutes.put("/update/:id", authenticateToken, updateCustomer);
customerRoutes.delete("/:id", authenticateToken, deleteCustomer);
customerRoutes.get("/allCustomerDetails", authenticateToken, getAllDetails);
export default customerRoutes;
