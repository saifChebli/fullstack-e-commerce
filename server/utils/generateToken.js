import jwt from "jsonwebtoken";


export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1d"})
}

export const generateEmailToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h"})
}