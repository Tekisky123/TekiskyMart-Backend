import express from 'express'
import { acceptEnquiry , getEnquiry} from '../controllers/enquiryController.js'

const enquiryRoutes = express.Router()

enquiryRoutes.post('/enquiry' , acceptEnquiry)
enquiryRoutes.get('/getEnquiry' , getEnquiry)


export default enquiryRoutes