import express from "express"
import dottenv from "dotenv"
import bodyParser from "body-parser"
import { dbConnect } from "./db/dbConnect.js"

const app=express()
dottenv.config()
let dburl=process.env.DBURL
let dbname=process.env.DBNAME
dbConnect(dburl,dbname)
app.use(bodyParser.urlencoded({extended:false}))
const port =process.env.PORT


 app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`server ${port}`)
})
