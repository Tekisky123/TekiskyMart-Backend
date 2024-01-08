import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    orderId:{type:String},
    customerName:{type:String,required:true},
    mobileNumber:{type:String,required:true},
    address:{type:String,required:true},
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'order', 'dispatch', 'delivered'],
      default: 'new',
    },
    timestamps: {
      order_date: { type: Date, required: true },
      delivery_date: { type: Date }
  }

    // Add more fields as needed (e.g., shipping information, payment details, etc.)
  }, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  });
  
  // Create an Order model based on the schema
  const Order = mongoose.model('Order', orderSchema);
  
 export default Order;
  