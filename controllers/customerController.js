import {
  addCustomerNumber,
  updateCustomerService,
  deleteCustomerService,
  customerDetailsService
} from "../services/customerSevices.js";

export const addCustomerNumberController = async (req, res) => {
  try {
    const status = await addCustomerNumber(req.body);
    if (status) {
      res.json({ success: true, message: "added successfully" });
    } else {
      res.json({ success: false, message: "error while adding successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCustomer = await updateCustomerService(id, req.body);
    if (updateCustomer) {
      res.json({
        success: true,
        message: "update successfully",
        updateCustomer: updateCustomer,
      });
    } else {
      res.json({
        success: false,
        message: "error while updating",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCustomer = await deleteCustomerService(id);
    if (deletedCustomer) {
      res.json({
        success: true,
        message: "customer details deleted succssfull",
      });
    } else {
      res.json({
        success: false,
        message: "error while deleting customer details ",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllDetails = async (req, res) => {
  try {
    const customeDetails = await customerDetailsService();
    res.json({
      success: true,
      message: "retrvie successfull",
      customeDetails: customeDetails,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error while retrvie ${error.message} `,
    });
  }
};
