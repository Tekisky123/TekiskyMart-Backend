import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { dbConnect } from "./db/dbConnect.js"
import orderRoute from "./routers/orderRouter.js";
import adminRoutes from "./routers/adminRoutes.js"

dotenv.config();
 const corsOptions = {
    origin: '*', // Replace with the origin(s) you want to allow
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
 };
  
// Enable CORS for all routes
const app=express(corsOptions)
app.use(cors())

let dburl=process.env.DBURL
let dbname=process.env.DBNAME
const port =process.env.PORT
dbConnect(dburl,dbname)

app.use(express.json())



app.use("/order", orderRoute)
//app.use("/product",productRoute)

app.use("/admin", adminRoutes)

app.listen(port, () => {
  console.log(`server started at port number  ${port}`)
})
