import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { dbConnect } from "./db/dbConnect.js"
import orderRoute from "./routers/orderRouter.js";
import productRoute from "./routers/productRouter.js";
dotenv.config();
const app=express()
let dburl=process.env.DBURL
let dbname=process.env.DBNAME
dbConnect(dburl,dbname)
app.use(express.json())
const port =process.env.PORT


 app.use("/order",orderRoute)
app.use("/product",productRoute)
app.listen(port,()=>{
    console.log(`server ${port}`)
})
