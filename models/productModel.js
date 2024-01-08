import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String,required:true }, //auto generate
    productCategory: { type: String, required: true },
    productName: { type: String, required: true },
    productType: { type: String, required: true },
    productBrand: { type: String, required: true },
    description: { type: String, required: true },
    availableStockQty: { type: Number, required: true }, // Corrected definition for the qty field
    availablePackQty: { type: Array },
    //varity: { type: String, required: true },
    mrp: { type: Number, required: true },
    offerPrice: { type: String, required: true },
    createdby: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
