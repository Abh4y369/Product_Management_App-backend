const categories=require('../Models/categoryModel')


//Add Category

exports.addCategory=async(req,res)=>{
    try{
        const {categoryName}=req.body
        if(!categoryName){
            res.status(400).json("Category name is required")
        }
        const existingCategory=await categories.findOne({categoryName})
        if(existingCategory){
          return res.status(400).json("Category Already Exists")
        }
        else{
            const newCategory=new categories({categoryName})
            await newCategory.save()
           return res.status(200).json(newCategory)
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json( err.message)
    }
}

exports.getAllCategories=async(req,res)=>{
    try{
        const listCategories=await categories.find()
        res.status(200).json(listCategories)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}

exports.deleteCategory=async(req,res)=>{
    try{
        const{cid}=req.params         //cid means category id
        const delCategory=await categories.findByIdAndDelete(cid)
        res.status(200).json("Category deleted successfully !!")
    }
    catch(err){
        console.log(err)
        res.status(500).json(err.message)
    }
}