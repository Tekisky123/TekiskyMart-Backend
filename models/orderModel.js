import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({


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
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },

    // Add more fields as needed (e.g., shipping information, payment details, etc.)
  }, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  });
  
  // Create an Order model based on the schema
  const Order = mongoose.model('Order', orderSchema);
  
 export default Order;
  