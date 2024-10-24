import { User } from "../models/User.js";
import { Crypt } from "../utils/Crypt.js";

export const login = async(req, res) => {
    const {username: usernameReq, password: passwordReq} = req.body;

    const users = await User.getUsers()

    for(const [_id, username, password] of users) {
        if(username === usernameReq && await Crypt.compare(passwordReq, password)){
            return res.status(200).json({message: "Successfully logged in!"})
        } else {
            return res.status(400).json({message: "Invalid login!"})
        }
    }

}