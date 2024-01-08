
import ProductModel from "../models/productModel.js";

// export const addProductSerivce = async (data,imageUrl) => {

//     try {
//         const newProduct = new ProductModel({...data,imageURL:imageUrl},{new:true});
//         console.log("admin service logs========>",newProduct);
//         const savedProduct = await newProduct.save();
//         return 'successfull';
//     } catch (error) {
//         console.error("Error adding product:", error);
//         throw new Error("Failed to add product");
//     }
// }

export const addProductSerivce = async (data, imageUrl) => {
    try {
        const newProduct = new ProductModel({ ...data, imageURL: imageUrl });
        console.log("admin service logs========>", newProduct);

        const savedProduct = await newProduct.save();
        console.log("Saved Product:", savedProduct);

        return 'successfull';
    } catch (error) {
        console.error("Error adding product:", error);
        throw new Error("Failed to add product");
    }
};


// Assuming this file is productServices.js


export const getProductService = async () => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.find();
        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in fetching products:', error);
        throw new Error('Error in fetching products');
    }
};

export const productUpdateService = async (id, updatedData) => {
    try {
        // Update a product in the database using Mongoose
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );
        return updatedProduct; // Return the updated product
    } catch (error) {
        // Handle any errors that occur during the update
        console.error('Error in updating the product:', error);
        throw new Error('Error in updating the product');
    }
};


export const productDeleteService = async (id) => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.findByIdAndDelete({_id:id});
        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in deleting the  products:', error);
        throw new Error('Error in deleting products');
    }
};



