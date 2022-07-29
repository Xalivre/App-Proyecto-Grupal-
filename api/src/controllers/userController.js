import User from "../models/User.js";
import { encrypt, compare } from "./helpers/handleBCrypt.js";
import { tokenSign } from "./helpers/generateToken.js";
import { sendMail } from "../librarys/emailer.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.json({ msg: "Users not found" });
    return res.json(users);
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.json({ msg: "User not found" });

    const checkPassword = await compare(password, user.password);
    const tokenSession = await tokenSign(user);
    if (checkPassword) {
      res.status(200).send({
        data: user,
        tokenSession,
      });
    }
    if (!checkPassword) {
      return res.json({ msg: "Invalid password" });
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const postUsers = async (req, res) => {
  try {
    const { username, password, email, role, cart } = req.body;
    if (!username || !password || !email)
      return res.json({ msg: "Missing required fields" });
    const userBD = await User.findOne({ email });
    if (userBD) return res.json({ msg: "The email already exists" });
    const usernameBD = await User.findOne({ username });
    if (usernameBD) return res.json({ msg: "The username already exists" });

    const passwordHash = await encrypt(password);
    await User.create({
      username: username,
      password: passwordHash,
      email: email,
      role: role || "user",
    });

    sendMail(email, username)
      .then((result) => console.log("email sended"))
      .catch((err) => console.log(err));

    return res.json({ msg: `${username} create succesfully` });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.json({ msg: "Username does not exist" });
    return res.json({ msg: "User Deleted" });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const userBD = await User.findOne({ email });
    if (userBD) return res.json({ msg: "The email already exists" });
    const usernameBD = await User.findOne({ username });
    if (usernameBD) return res.json({ msg: "The username already exists" });

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.json({ msg: "The user was not found" });
    return res.json({ msg: "User Updated" });
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const addItemToCart = async (req, res) => {
  const { id } = req.params;
  const { cart } = req.body;
  try {
    const userDB = await User.findById(id);
    if (!userDB) return res.status(404).send("The user was not found");
    while (cart.length > 0) {
      const products = [];
      const product = await Product.findById(cart[0]);
      cart.shift();
      products.push(product);
    }
    userDB.cart.push(product);
    userDB.save();
  } catch (e) {}
};
