export const authorize = (...allowableRoles) => {
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({message : "Not Authorised"})
        if (!allowableRoles.includes(req.user.role)){
            return res.status(403).json({message : "No permissions"})
        }

        next()
    }
}