import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateNumber:{type: String,},
  address: { type: String, required: true },
  landmark:{type: String, required: true},
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, },
    productDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductDetails', required: true, },
    quantity: { type: Number, required: true, },
  },],

  totalAmount: { type: Number, required: true, },
  orderStatus: { type: String, default: "Not Processed", enum: ["Not Processed", "Cash on Delivery", "Processing", "Dispatched", "Cancelled", "Delivered",], },
  feedback: { type: Number, trim: true }

}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create an Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

export default Order;
