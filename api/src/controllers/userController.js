import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.json(users)
    } catch (e) {
        console.log(e)
    }
}

export const postUsers = async (req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        return res.json(newUser);
    } catch (e) {
        console.log(e)
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        return res.send("Product Deleted");
    } catch (e) {
        console.log(e);
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params
     try{
       const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
       return res.send('User Updated');
     } catch(e){
       console.log(e)
     }
} 