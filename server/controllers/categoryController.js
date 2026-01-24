import Category from "../models/Category.js";

// create new category
// POST
// parameter : name
export const createCat = async (req, res) =>{
    const {name} = req.body

    try {
        if(!name) return req.status(400).json({message : "Category name is required"})
        
        const existcategory = await Category.findOne({name})
        if(existcategory) return res.status(400).json({message : "Category already exist"})
        
        const category = await Category.create({name})
        res.status(201).json({success : true , message : "Category created successfully" , category})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server Error"})
        
    }
}

// GET
export const getAllCategories = async (req, res)=>{
    try {
        const catogories = await Category.find()
        res.status(200).json(catogories)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "internal Server error"})
        
    }
}

// PUT
// parameters : name , categoryId
export const updateCategory = async (req, res) => {
    const { name } = req.body
    const { categoryId } = req.params

    try {
        const category = await Category.findByIdAndUpdate(categoryId, {name}, {new : true})
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal Server error"})
    }
}

// DELETE
// parameter : categoryId
export const deleteCategory = async (req, res) =>{
    const { categoryId } = req.params

    try {
        await Category.findByIdAndDelete(categoryId)
        res.status(200).json({ success: true , message : "Category deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal Server error"})
        
    }
}