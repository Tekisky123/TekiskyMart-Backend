import { addCustomerNumberController ,updateCustomer,deleteCustomer,getAllDetails} from "../controllers/customerController.js";
import express from "express";

let customerRoutes = express.Router();

customerRoutes.post("/number", addCustomerNumberController);
customerRoutes.put("/update/:id",updateCustomer);
customerRoutes.delete("/:id",deleteCustomer)
customerRoutes.get("/allCustomerDetails",getAllDetails)
export default customerRoutes;
