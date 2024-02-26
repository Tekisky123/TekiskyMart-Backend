import mongoose from "mongoose";

const customerScehma = mongoose.Schema({
  customerName: { type: String, trim: true },
  mobileNumber: { type: String, trim: true, required: true },
  category: { type: String, trim: true },
  knownField: { type: String, trim: true },
});

const CustomerModel = mongoose.model("customerNumbers", customerScehma);

export default CustomerModel;
