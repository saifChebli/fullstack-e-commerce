import  User  from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'



export const signUp = async(req, res) => {
    try{
        const { name, email, password } = req.body;

        const exisitingUser = await User.findOne({email})

        if(exisitingUser) return res.status(400).json({ message: "User already Exisit"})
        // const hashedPassword = await bcrypt.hash(password , 10)
        const newUser = await User.create({name, email, password})
        res.status(201).json({ message: "User created successfully.", user: { id: newUser._id, email: newUser.email, name: newUser.name }})
    }catch(error){
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const exisitingUser = await User.findOne({email}).select("+password")
        if(!exisitingUser) return res.status(400).json({message: "Bad credentials"})

        const isMatch = await exisitingUser.matchPassword(password)
        if (!isMatch) return res.status(400).json({message : "Invalid credentials"})

        res.status(200).json({message: "Logged in successfully", user: {id: exisitingUser._id, name: exisitingUser.name, email: exisitingUser.email, role: exisitingUser.role}, token: generateToken({id : exisitingUser._id, role: exisitingUser.role})})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error"})
    }
}

