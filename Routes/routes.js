const express = require('express');
const router = express.Router();
const jwtMiddle = require('../Middlewares/jwtMiddleware');

const userControllers = require('../Controllers/userControllers');
const categoryControllers=require('../Controllers/categoryController')
const subCategoryControllers=require('../Controllers/subCategoryController')


//user
router.post('/user/signup',userControllers.SignUp)
router.post('/user/signin',userControllers.SignIn)
router.get('/user/profile',jwtMiddle,userControllers.getProfile)

//category
router.post('/category/add',jwtMiddle,categoryControllers.addCategory)
router.get('/category/all',jwtMiddle,categoryControllers.getAllCategories)
router.delete('/category/delete/:id',jwtMiddle,categoryControllers.deleteCategory)

//sub category
router.post('/subcategory/add',jwtMiddle,subCategoryControllers.addSubcategory)
router.get('/subcategory/all',jwtMiddle,subCategoryControllers.getAllSubCategories)








module.exports = router;