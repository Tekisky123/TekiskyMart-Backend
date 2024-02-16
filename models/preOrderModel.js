import mongoose from "mongoose";

const preOrderSchema = new mongoose.Schema({
    costumerName: {type:String,required:true,trim:true},
    mobileNumber:{type:String,required:true,trim:true},
    wichPoductWantToPurchase:{type:String,required:true,trim:true},
    quantity:{type:Number,required:true,trim:true},
    discription:{type:String,}
})

const preOrderModel = mongoose.model('pre-order', preOrderSchema)

export default preOrderModel