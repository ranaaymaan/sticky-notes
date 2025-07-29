import mongoose, { model, Schema } from "mongoose";

const userschema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      min:18,
      max:60
      
    },
  },
  {
    timestamps:false
  }
);
const userModel = mongoose.model.User || model('User', userschema)
export default userModel