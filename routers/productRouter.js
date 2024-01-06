import express from "express"
import { saveProduct } from "../services/productService.js";

let productRoute=express.Router();
productRoute.post("/saveProduct",saveProduct)



export default productRoute