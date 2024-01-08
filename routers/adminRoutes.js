import { addProduct, deleteProduct, getProduct, updateProduct, } from "../controllers/adminContoller.js";
import  express from "express";
import multer, { memoryStorage } from "multer"
const upload = multer({ storage: multer.memoryStorage() });

const adminRoutes = express.Router()


adminRoutes.post('/addproduct',upload.single('file'),addProduct)
adminRoutes.get('/getproduct',getProduct)
adminRoutes.put('/update/:id',updateProduct)
adminRoutes.get('/delete/:id',deleteProduct)

export default adminRoutes