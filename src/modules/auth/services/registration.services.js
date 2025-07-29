import userModel from "../../../DB/models/user.model.js"
import * as bcrypt from 'bcrypt'
import CryptoJS from "crypto-js"
import jwt from 'jsonwebtoken'






export const signup =async (req,res,next)=>{
 try {
       const {name,email,password,phone}=req.body
    const checkUser = await userModel.findOne({email})
    if(checkUser){
           return res.status(409).json({ message: "email already exist" }); 
    }
    const encryptphone = CryptoJS.AES.encrypt(
      phone,
      process.env.ENCRYPTION_SIGNATURE
    ).toString()
    const hashPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUND)
    );
const user = await userModel.create({ name, email, password:hashPassword,phone:encryptphone });
    return res.status(201).json({message:'done',user})
}
  catch (error) {
     return res.status(500).json({ message: "server error",error,msg:error.message,stack:error.stack });
 }
}