const products = require('../Models/productModel')
const users = require("../Models/userModel")


exports.addProduct = async (req, res) => {
    try {
        const { productName, description, subCategoryId, variants } = req.body
        if (!productName || !description || !subCategoryId) {
            return res.status(400).json("Please fill all the fields")       //validation
        }
        if (!req.file) {
            return res.status(400).json("Product Image is required")
        }
        const image = req.file.filename;              //filename is taken and stored in DB not entire file
        const existingProduct = await products.findOne({ productName })
        if (existingProduct) {
            res.status(400).json("Product Already Exists")
        }
        else {
            const newProduct = new products({
                productName, description, image, subCategoryId,
                variants: typeof variants === "string" ? JSON.parse(variants) : variants
            })  // converts if the variant is JSON to Javascript obj/array
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}



exports.getAllProducts = async (req, res) => {
    try {
        const { search, subCategoryId, page = 1 } = req.query; //search,filter,pagination
        let query = {};
        if (search) {
            query.productName = { $regex: search, $options: "i" };
        }
        if (subCategoryId) {
            query.subCategoryId = subCategoryId;
        }
        const limit = 6;
        const allProducts = await products.find(query).populate("subCategoryId").skip((page - 1) * limit).limit(limit);
        const totalProducts = await products.countDocuments(query);
        res.status(200).json({ allProducts, totalProducts });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
};


exports.getProductById = async (req, res) => {
    try {
        const { pid } = req.params
        const productData = await products.findById(pid).populate("subCategoryId")
        if (!productData) {
            res.status(400).json("Product Not Found")
        }
        else {
            res.status(200).json(productData)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}


exports.productUpdate = async (req, res) => {
    try {
        const { pid } = req.params
        const { productName, description, subCategoryId, variants, image } = req.body
        const productImage = req.file ? req.file.filename : image
        const updatedProduct = await products.findByIdAndUpdate(pid, {
            productName, description, subCategoryId, image: productImage,
            variants: typeof variants === "string" ? JSON.parse(variants) : variants
        }, { new: true })
        if (!updatedProduct) {
            res.status(400).json("Product Not Found")
        }
        else {
            res.status(200).json(updatedProduct)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const deletedProduct = await products.findByIdAndDelete(pid)
        if (!deletedProduct) {
            return res.status(404).json("Product Not Found")
        }
        else {
            res.status(200).json("Product deleted successfully")
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}

exports.addtoWishlist = async (req, res) => {
    try {
        const { pid } = req.params    //product Id
        const uid = req.payload  //user Id stored as payload in jwtMiddleware.js file
        const user = await users.findByIdAndUpdate(uid, { $addToSet: { wishlist: pid } }, { new: true })
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}


exports.getWishlist = async (req, res) => {
    try {
        const uid = req.payload
        const userwishlist = await users.findById(uid).populate("wishlist")    //fetching wishlist using user id
        if (!userwishlist) {
            return res.status(404).json("User not found")
        }
        res.status(200).json(userwishlist.wishlist)

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}


exports.deleteWishlist = async (req, res) => {
    try {
        const { pid } = req.params
        const uid = req.payload
        const user = await users.findByIdAndUpdate(uid, { $pull: { wishlist: pid } }, { new: true })
        res.status(200).json(user)

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}