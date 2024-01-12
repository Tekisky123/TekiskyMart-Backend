
import ProductModel from "../models/productModel.js";
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

const generateProductId = async () => {
    try {
        const productId = new mongoose.Types.ObjectId().toHexString();
        return productId;
    } catch (error) {
        throw new Error("Failed to generate product ID: " + error.message);
    }
};

export const addProductSerivce = async (data, imageUrl) => {
    const productId = await generateProductId(); 
    try {
        const newProduct = new ProductModel({ ...data, imageURL: imageUrl, productId: productId });
        
        const savedProduct = await newProduct.save();
          console.log(savedProduct)
        return 'successful';
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error("Validation error:", error.message);
            throw new Error("Validation error");
        } else {
            console.error("Error adding product:", error);
            throw new Error("Failed to add product");
        }
    }
};



// Assuming this file is productServices.js


export const getProductService = async () => {
    try {
        // Fetch all products from the database using Mongoose
        const products = await ProductModel.find();
        // const {availableStockQty} = products
        //console.log(availableStockQt)


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
        const products = await ProductModel.findByIdAndDelete({ _id: id });
        return products; // Return the fetched products
    } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error in deleting the  products:', error);
        throw new Error('Error in deleting products');
    }
};





export const getOneProduactService = async (id) => {
    try {
        const OneProduact = await ProductModel.findOne({ _id: id });
        if (!OneProduact) {
            throw new Error("Product not found");
        }
        return OneProduact;
    } catch (error) {
        throw new Error(`Error while getting product: ${error.message}`);
    }
};
