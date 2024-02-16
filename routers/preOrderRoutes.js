
import express from 'express'
import { getPreOrder, preOrder } from '../controllers/preOrderController.js';
const preOrderRoutes = express.Router();



preOrderRoutes.post('/order', preOrder);

preOrderRoutes.get('/getPreOrders', getPreOrder)

export default preOrderRoutes