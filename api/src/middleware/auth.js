import { verifyToken } from "../controllers/helpers/generateToken.js";

 export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if(tokenData._id){
            next()
        } else {
            res.status(409).send({error: "You don't have permissions"})
        }
    } catch (e) {
        res.status(409).send({error: "You don't have permissions"})
    }
}