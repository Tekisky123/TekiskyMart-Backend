
// import { addProdactSerivces, getProdactServioces, productUpdateService } from "../services/adminServices.js";

import { addProductSerivce, getProductService, productDeleteService, productUpdateService } from "../services/adminServices.js";

// createing prodact in DB 
export const addProduct = async (req, res) => {
    try {
        const status = await addProductSerivce(req.body);

        if (status === 'successfull') {
            res.status(201).json({success : true , message : "Successfully added product"});
        } else {
            res.status(400).json({success : false , message : "error while adding the product"});
            }
    } catch (error) {
        console.error('Error in controller adding product:', error);
        res.status(500).send('Error in controller adding product');
    }
};


//get prodact services 
export const getProduct = async (req, res) => {
    try {
        const products = await getProductService();
        res.status(200).json({success : true, products:products }); // Sending status and products as an object
    } catch (error) {
        console.error('Error in getting products:', error);
        res.status(500).json({ status: 'error', message: 'Error in getting products' });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const updateProduct = await productUpdateService(id)
        res.status(200).json({ success: true, message: "product updated successfully" , product : updateProduct} , {new : true})
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }

}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const updateProduct = await productDeleteService(id)
        res.status(200).json({ success: true, message: "product deleted successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }

}



