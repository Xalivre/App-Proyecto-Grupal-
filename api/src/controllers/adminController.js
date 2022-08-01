import User from "../models/User.js";
import { encrypt } from "./helpers/handleBCrypt.js";

export const forcePasswordAdmin = async (req, res) => {
    const {email, password} = req.body;
  
    try {
      if(!email) return res.status(404).send("User not found");
      let defaultPassword= password || "defaultPassword";
  
      const passwordHash = await encrypt(defaultPassword);
  
      const userDB = await User.findOneAndUpdate({email},{
        password: passwordHash
      },{new: true,});
  
      if(!userDB) return res.status(404).send("User not found");
  
      return res.json({msg: "Password updated"})
    }catch (e) {
      return res.json({ msg: `Error 404 - ${e}` });
    }
  }
