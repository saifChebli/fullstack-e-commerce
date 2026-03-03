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
   
    try {
         const { productId } = req.params

        const product = await Product.findById(productId)

        if (!product) return res.status(404).json({message : "Not found"})

        
        // Old images sent from client side
            let oldImages = []
            if(req.body.oldImages){
                oldImages = JSON.parse(req.body.oldImages)
            }

            console.log('Old :' , oldImages)

            // New Images uploaded
            let newImages = []

            if(req.files && req.files.length > 0){
                newImages = req.files.map(
                    (file) => `/uploads/products/${file.filename}`
                )
            }   

            console.log('New :' , newImages)


            // Merge oldImages + newImages

            const images = [...oldImages , ...newImages]

            const updatedProduct = await Product.findByIdAndUpdate(
                productId ,
                {
                    ...req.body,
                    image : images
                },
                { new : true }
            )

        res.status(200).json(updatedProduct)
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