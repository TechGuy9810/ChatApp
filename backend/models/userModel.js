import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false,
        default:"Hi there!"
    },
    mail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:"",
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User;