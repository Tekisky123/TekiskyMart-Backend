import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true }, // Auto-generate elsewhere
    productCategory: { type: String, required: true, trim: true }, // Added trim
    productName: { type: String, required: true, trim: true }, // Added trim
    productType: { type: String, required: true, trim: true }, // Added trim
    productBrand: { type: String, required: true, trim: true }, // Added trim
    description: { type: String, required: true, trim: true }, // Added trim
    availablePackQty: { type: Number },
    availableStockQty: { type: Number, required: true },
    mrp: { type: Number, required: true },
    offerPrice: { type: String, required: true, trim: true },
    packetweight: { type: String, required: true, trim: true }, // Added trim
    createdby: { type: String, required: true, trim: true }, // Added trim
    imageURL: { type: Array, required: true },
    manufactureDate: { type: String, required: true, trim: true },
    expiryDate: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
