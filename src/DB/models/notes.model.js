import mongoose, { Schema,model } from "mongoose";



const noteschema = new Schema({
    title: {
      type: String,
      require: true,
      validate: {
         validator: function (v) {
           return uppercase.test(v);
         },
       },
    },
    content : {
      type: String,
      require: true,
    },
    userid: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
      require: true,
    },

  },
  {
    timestamps:true,
  }
);
const noteModel = mongoose.model.Note || model('Note', noteschema)
export default noteModel