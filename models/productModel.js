import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
  availablePackQty: { type: Number },
  availableStockQty: { type: Number, required: true },
  mrp: { type: Number, required: true },
  offerPrice: { type: Number, required: true, trim: true },
  packetweight: { type: Number, required: true, trim: true },
  unitOfmeasure: { type: String, required: true, trim: true },
});


const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true, trim: true },
    productCategory: { type: String, required: true, trim: true },
    productName: { type: String, required: true, trim: true },
    productType: { type: String, required: true, trim: true },
    productBrand: { type: String, required: true, trim: true },
    productDetails: {type:[productDetailsSchema],required:true},
    description: { type: String, required: true, trim: true },
    createdby: { type: String, required: true, trim: true },
    imageURL: { type: Array, required: true },
    manufactureDate: { type: String, required: true, trim: true },
    expiryDate: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
