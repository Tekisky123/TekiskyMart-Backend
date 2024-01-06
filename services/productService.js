// import Product from "../models/productModel.js";

// let saveProduct=async (req,res)=>{


// try {
//     let {productName,description,price,qty,imageURL}=req.body;
//     let product=new Product({productName,description,price,qty,imageURL});
//          let result=await product.save();
//           console.log(product);
//           if(result){
//             res.send("success");
//           }
  
// } catch (error) {
//     console.log('error in service')
//     console.log(error);
//     res.status(500).json({msg:"Interla Servwer Error"});
// }
// console.log(req.body)
// }


// export {saveProduct}