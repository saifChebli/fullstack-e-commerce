import Product from '../models/Product.js'



// POST
// parameters : name , description , price , stock , category , image
export const createProduct = async (req , res) => {
    try {

        const image = req.files.map(
            (file) => `/uploads/products/${file.filename}`
        )

        const product = await Product.create({
            ...req.body,
            image
        })

        res.status(201).json({message : "Product created successfully" , product})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}

//GET
export const getAllProducts = async (req , res) => {
    try {
        const products = await Product.find().populate("category" , "name")
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


//GET
//parameter : productId
export const getSingleProduct = async (req , res) => {

    const { productId } = req.params

    try {
        const product = await Product.findById(productId).populate("category" , "name")
        if (!product) return res.status(404).json({message : "Product not found"})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


//PUT
//parameter : productId , {name , price , description , stock , image , category}
export const updateProduct = async (req , res) => {
    const { productId } = req.params
    const {name , price , description , stock , image , category} = req.body
    try {
        const product = await Product.findByIdAndUpdate(productId , {name , price , description , stock , image , category} , {new : true})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


//DELETE
//parameter : productId
export const deleteProduct = async (req , res) => {
    const { productId } = req.params
    try {
        await Product.findByIdAndDelete(productId)
        res.status(200).json({message : "Product deleted"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}