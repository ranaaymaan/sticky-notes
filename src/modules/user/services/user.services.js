import userModel from "../../../DB/models/user.model.js"



export const updateduser = async (req,res,next)=>{
    try {
       const{name,email,phone,age}=req.body
if(!email){
    const emailexist= await userModel.findOne({email})
    if(emailexist)
    return res.status(400).json({message:"email already exist"})

}
const user = await userModel.findByIdAndUpdate(req.userId,{name,email,phone,age},{new:true})
        if(!user){
            return res.status(404).json({ message: "User not found" });

        }
        return res.status(200).json({ message: "User updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const deleteuser = async(req,res,next)=>{
    try {
        const user = await userModel.findByIdAndDelete(req.userId)
         if (!user){
             return res.status(404).json({ message: "User not found" });
         }
         res.status(200).json({ message: "User deleted" });
    } catch (error) {
           res.status(500).json({ message: error.message });
  
    }
}
export const getuser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};