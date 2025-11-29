import jwt from "jsonwebtoken";


export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWTKEY, {expiresIn: "1d"})
}