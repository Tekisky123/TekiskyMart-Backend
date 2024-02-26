import CustomerModel from "../models/customerModel.js";

export const addCustomerNumber = async (data) => {
  try {
    let saveNumber = await new  CustomerModel(data);
    saveNumber.save();
    return true;
  } catch (error) {
    console.log("error while adding number ", error.messsage);
    return false
  }
};

export const updateCustomerService = async (id, data) => {
  try {
    const updateCustomer = await CustomerModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateCustomer;
  } catch (error) {
    console.log(error.messsage);
  }
};

export const deleteCustomerService = async (id) => {
  try {
    const deleted = await CustomerModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log(error.messsage);
  }
};

export const customerDetailsService =async()=>{
try {
  const customeDetails =await CustomerModel.find()
  return customeDetails
} catch (error) {
    return error.messsage
}
}