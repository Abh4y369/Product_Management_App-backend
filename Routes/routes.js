const express = require('express');
const router = express.Router();
const jwtMiddle = require('../Middlewares/jwtMiddleware');
const multerConfig=require('../Middlewares/multerMiddleware')

const userControllers = require('../Controllers/userControllers');
const categoryControllers=require('../Controllers/categoryController')
const subCategoryControllers=require('../Controllers/subCategoryController')
const productControllers=require('../Controllers/productController')



//user
router.post('/user/signup',userControllers.SignUp)
router.post('/user/signin',userControllers.SignIn)
router.get('/user/profile',jwtMiddle,userControllers.getProfile)

//category
router.post('/category/add',jwtMiddle,categoryControllers.addCategory)
router.get('/category/all',jwtMiddle,categoryControllers.getAllCategories)


//sub category
router.post('/subcategory/add',jwtMiddle,subCategoryControllers.addSubcategory)
router.get('/subcategory/all',jwtMiddle,subCategoryControllers.getAllSubCategories)

//products
router.post('/product/add',jwtMiddle,multerConfig.single('image'),productControllers.addProduct)
router.get('/product/all',jwtMiddle,productControllers.getAllProducts)
router.get('/product/:pid',jwtMiddle,productControllers.getProductById)
router.put('/product/update/:pid',jwtMiddle,multerConfig.single('image'),productControllers.productUpdate)
router.delete('/product/delete/:pid',jwtMiddle,productControllers.deleteProduct)

//wishlists
router.put('/wishlist/add/:pid',jwtMiddle,productControllers.addtoWishlist)
router.get('/wishlist',jwtMiddle,productControllers.getWishlist)
router.delete('/wishlist/delete/:pid',jwtMiddle,productControllers.deleteWishlist)










module.exports = router;