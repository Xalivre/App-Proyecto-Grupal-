import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.json(users)
    } catch (e) {
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const postUsers = async (req, res) => {
    try{
        const {username, password} = req.body;
        const nameRepeat = await User.findOne({username});
        if(!username || !password) return res.send("Username and password is required");
        if(nameRepeat.username === username) return res.send("The username already exists with that name");
        const newUser = new User(req.body);
        await newUser.save();
        return res.json(newUser);
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