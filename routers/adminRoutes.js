import { addProduct, deleteProduct, getProduct, updateProduct, } from "../controllers/adminContoller.js";
import  express from "express";

const adminRoutes = express.Router()


adminRoutes.post('/addproduct',addProduct)
adminRoutes.get('/getproduct',getProduct)
adminRoutes.post('/update/:id',updateProduct)
adminRoutes.get('/delete/:id',deleteProduct)

export default adminRoutes