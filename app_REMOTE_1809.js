import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./db/dbConnect.js"
import adminRoutes from "./routers/adminRoutes.js"

const app = express()
dotenv.config()
let dburl = process.env.DBURL
let dbname = process.env.DBNAME
dbConnect(dburl, dbname)

app.use(express.json())
const port = process.env.PORT

app.use("/admin", adminRoutes)


app.listen(port, () => {
    console.log(`server started at port number  ${port}`)
})
