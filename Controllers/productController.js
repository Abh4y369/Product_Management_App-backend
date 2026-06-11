const products=require('../Models/productModel')
const users=require("../Models/userModel")


exports.addProduct=async(req,res)=>{
    try{
     const {productName,description,subCategoryId,variants}=req.body
     if(!productName || !description || !subCategoryId){
      return res.status(400).json("Please fill all the fields")       //validation
     }
     if(!req.file){
       return res.status(400).json("Product Image is required")
     }
     const image=req.file.filename;              //filename is taken and stored in DB not entire file
     const existingProduct=await products.findOne({productName})
     if(existingProduct){
        res.status(400).json("Product Already Exists")
     }
     else{
        const newProduct=new products({productName,description,image,subCategoryId,
            variants: typeof variants === "string"? JSON.parse(variants):variants})  // converts if the variant is JSON to Javascript obj/array
            await newProduct.save()
            res.status(200).json(newProduct)
     }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}


exports.getAllProducts=async(req,res)=>{
    try{
      const search=req.query.search
      console.log(search)
      const subCategoryId=req.query.subCategoryId
      const page=Number(req.query.page) || 1
      const limit=6
      let query ={}
      if(search){                                           //search
        query.productName ={$regex: search, $options:"i"}
      }
      //filter
      if(subCategoryId){
        query.subCategoryId=subCategoryId
      }
      const AllProducts=await products.countDocuments(query)
      const productList=await products.find(query).populate('subCategoryId').skip((page-1)*limit).limit(limit)  //based on search,filter,pagination
      res.status(200).json(productList)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}


exports.getProductById=async(req,res)=>{
    try{
        const {pid}=req.params
        const productData=await products.findById(pid)
        if(!productData){
            res.status(400).json("Product Not Found")
        }
        else{
            res.status(200).json(productData)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(ferr.message)
    }
}