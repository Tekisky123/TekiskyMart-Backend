import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty:{type: Number,
      required: true,
    },
    imageURL: {
        type: String, // Assuming the image URL will be a string
        required: true,
      },
  });

const Product = mongoose.model('Product', productSchema);

export default Product