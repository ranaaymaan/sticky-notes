import userModel from "../../../DB/models/user.model.js";
import * as bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const User = await userModel.findOne({ email });
    if(!User){
        return res.status(404).json({message:"in-valid email or password"})
    }
    const match = bcrypt.compareSync(password,User.password)
    const token = jwt.sign(
      { id: User._id, isLoggedIn: true },
      process.env.TOKEN_SIGNATURE,
      { expiresIn: "1h" }
    );
  
    return res.status(200).json({ message: "login successful" ,token});
    
  }catch(error){
 return res
   .status(500)
   .json({
     message: "server error",
     error,
     msg: error.message,
     stack: error.stack,
   });
  }
}