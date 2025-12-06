import User from "../models/User.js"





// Get All users (Admin)


export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


// Update user (role , isBlocked , name , email) (Admin)


export const updateUser = async (req,res) => {
    const { id } = req.params
    const { name , email , role , isBlocked} = req.body
    try {
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ message : "User not found" })

        user.name = name ?? user.name
        user.email = email ?? user.email

        if (role) user.role = role

        if (typeof isBlocked === "boolean") user.isBlocked = isBlocked

        await user.save()

        res.status(200).json({message : "User updated successfully" , user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
}


// Delete user (Admin)
// axios.delete("http://localhost:5000/api/user/474683627384755930")

export const deleteUser = async (req,res) => {
    const { id }= req.params
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message : "User deleted successfully"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


// Update User Profile (User)
// TO-DO add update profile picture
export const updateProfile = async (req,res) => {

    const userId = req.user.id
    const { name , email } = req.body
    try {
        const user = await User.findById(userId)

        if (!user) return res.status(404).json({message : "User Not Found"})
        
        if (name) user.name = name
        if (email) user.email = email

        await user.save()

        res.status(200).json({message : "User updated successfully" , user})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
}


const BMW = {
    color : "red",
    price : 4000
}

BMW.year = 2005