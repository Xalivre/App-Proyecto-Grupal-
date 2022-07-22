import User from "../models/User.js";
import {encrypt, compare} from "./helpers/handleBCrypt.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        if(!users) return res.json({msg: "Users not found"})
        return res.json(users)
    }catch (e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user) return res.json({msg: "User not found"});

        const checkPassword = await compare(password, user.password)
        checkPassword? res.json({msg: "Welcome"}) : res.json({msg: "Invalid password"});
    }catch (e){
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
        return res.json(registerUser)
    }catch (e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser) return res.json({msg: "Username does not exist"});
        return res.json({msg: "User Deleted"});
    }catch (e){
        return res.json({msg: `Error 404 - ${e}`});
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params

     try{
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedUser) return res.json({msg: "The user was not found"});
        return res.json({msg: 'User Updated'});
     } catch(e){
        return res.json({msg: `Error 404 - ${e}`});
     }
} 