import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { dbConnect } from "./db/dbConnect.js"
dotenv.config();
const app=express()
let dburl=process.env.DBURL
let dbname=process.env.DBNAME
dbConnect(dburl,dbname)
app.use(express.json())
const port =process.env.PORT


 //app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`server ${port}`)
})
