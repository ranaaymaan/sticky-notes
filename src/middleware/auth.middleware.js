
import jwt from 'jsonwebtoken'
import userModel from '../DB/models/user.model.js';



export const authentication =()=>{
    return async (req, res, next) => {
      try {
        const { authorization } = req.headers;
       console.log(authorization)
       if (!authorization){
return res.status(400).json({message:"authorization is required"})

       }
       const [Bearer,token]=authorization.split(" ")
       if(!Bearer||token){
        return res.status(400).json({ message: "authorization is required" });
       }
       let TOKEN_SIGNATURE = undefined;
       const decoded = jwt.verify(token,process.env.TOKEN_SIGNATURE)
       if(decoded?._id){
        return res.status(409).json({ message: "in-valid token payload" });
        
       }
       const user = await userModel.findById(decoded._id)
       if(!user){
return res.status(404).json({ message: "User not found" });
      
       }
        req.userId = user._id 
          
      } catch (error) {
        if(error?.name){
            switch (error.name) {
                case "TokenExpiredError":
                    case"JsonWebTokenError":
                     return res.status(401).json({ message: error });
            
                default:
                    break;
            }
        }

        return res
          .status(500)
          .json({
            message: "internal server error ",
            error,
            msg: error.message,
            stack: error.stack,
          });
      }
    };
}