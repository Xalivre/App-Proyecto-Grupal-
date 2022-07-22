import User from "../models/User.js";
import {encrypt, compare} from "./helpers/handleBCrypt.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.json(users)
    } catch (e) {
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            res.status(404).send({error: "User not found"})
        }
        const checkPassword = await compare(password, user.password)
        if(checkPassword){
            res.send({msg: "Welcome"})
        }
        if(!checkPassword){
            res.status(404).send({error: 'Invalid password'})
        }
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const postUsers = async (req, res) => {
    try{
        const {username, password} = req.body;
        const passwordHash = await encrypt(password)
        const registerUser = await User.create({
            username,
            password: passwordHash
        })
        res.json(registerUser)
    } catch (e) {
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) return res.send("Username does not exist");
        return res.send("User Deleted");
    } catch (e) {
        return res.json({msg: `Error 404 - ${e}`});
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params
     try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedUser) return res.send("The user was not found");
        return res.send('User Updated');
     } catch(e){
        return res.json({msg: `Error 404 - ${e}`});
     }
} 