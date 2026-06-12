const categories = require('../Models/categoryModel')
const subcategories = require('../Models/subCategoryModel')

exports.addSubcategory = async (req, res) => {
    try {
        const { subCategoryName, categoryId } = req.body
        if (!subCategoryName || !categoryId) {                     //validation
            return res.status(400).json("Please fill in all the fields")
        }
        //checking category exists
        const category = await categories.findById(categoryId)
        if (!category) {
            return res.status(400).json("Category not found")
        }
        const existingSubCategory = await subcategories.findOne({ subCategoryName, categoryId })   //check duplicates
        if (existingSubCategory) {
            return res.status(400).json("Sub Category Already Exists")
        }
        else {
            const newSubCategory = new subcategories({ subCategoryName, categoryId })
            await newSubCategory.save()
            return res.status(200).json(newSubCategory)
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}

exports.getAllSubCategories = async (req, res) => {
    try {
        const ListSubCategories = await subcategories.find()
        res.status(200).json(ListSubCategories)

    } catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}
