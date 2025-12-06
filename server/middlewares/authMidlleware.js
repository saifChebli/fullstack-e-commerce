import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const access = async (req, res, next) => {
    let token
// token from headers: Authorization : Bearer <token>
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) return res.status(401).json({message : "Not Authorised: token missin"})
    
    try {
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    // attach user to request

    req.user = {id : decoded.id, role : decoded.role}

    // check that the user still exists

    const existingUser = await User.findById(decoded.id)
    if(!existingUser) return res.status(401).json({message : "Not Authorised, user not found"})

    if (req.user.isBlocked) return res.status(403).json({message : "Account blocked"})
        
    next()
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({message : "Not authorised, token invalid"})
        
    }





}