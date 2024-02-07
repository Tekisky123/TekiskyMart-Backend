import { addProduct, deleteProduct, getProduct, updateProduct,getOneProduct,dealOfTheDay, getCategories, findProductsByMobileNumber,getApprovedProduct} from "../controllers/productController.js";
import  express from "express";
import multer, { memoryStorage } from "multer"
const upload = multer({ storage: multer.memoryStorage() });

const adminRoutes = express.Router()


adminRoutes.post('/addproduct',upload.array('files',5),addProduct)
adminRoutes.get('/getproduct',getProduct)
adminRoutes.put('/update/:id',updateProduct)
adminRoutes.get('/delete/:id',deleteProduct)
adminRoutes.get('/getoneproduct/:id',getOneProduct)
adminRoutes.get('/dealoftheday',dealOfTheDay)
adminRoutes.get('/getcategories',getCategories)
adminRoutes.get('/mobile/:mobileNumber', findProductsByMobileNumber)
adminRoutes.get('/approved',getApprovedProduct)

export default adminRoutes