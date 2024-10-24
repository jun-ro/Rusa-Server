import { User } from "../models/User.js";

export const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.createUser(username, password);
    res.status(200).json({ message: `Successfully registered new user!` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
