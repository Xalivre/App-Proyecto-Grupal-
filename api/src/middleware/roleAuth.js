import { verifyToken } from "../controllers/helpers/generateToken.js";
import User from "../models/User.js"

export const checkRoleAuth = (roles) => async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await User.findById(tokenData._id)

        if([].concat(roles).includes(userData.role)){
            next()
        }else{
            res.status(409).send({error: "You don't have permissionss"})
        }
    } catch (e){
        res.status(409).send({error: "You don't have permissions"})
    }
}