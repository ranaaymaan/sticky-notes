import mongoose from 'mongoose'

const connectDB= async()=>{
  await mongoose
    .connect(process.env.DB_CONNECTION)
    .then((res) => {
      console.log("db connecting");
    })
    .catch((error) => {
      console.error("fail to connect on db");
    });
}
export default connectDB