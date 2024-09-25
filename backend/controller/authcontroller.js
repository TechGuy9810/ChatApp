import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import GenerateTokenAndSetCookie from "../utils/generateToken.js";
export const login = async (req,res)=>{
    try{
const {mail,password} = req.body;
const email = mail.toLowerCase();
const user = await User.findOne({mail:email});
if(!user)
{
    throw new Error("User not exists!");
}

const isPasswordCorrect = await bcryptjs.compare(password,user?.password|| "");

if(!isPasswordCorrect)
{
    throw new Error("Incorrect Password!");
}
GenerateTokenAndSetCookie(user._id,res);
res.status(200).json(
    {
        _id: user._id,
        fullName:user.fullName,
        description:user.description,
        profilePic:user.profilePic
    });
    }
    catch(error)
    {
           res.status(500).json(error.message);
    }
}
export const logout =async (req,res)=>{
    try{
   res.cookie("jwt"," ",{maxAge:0});
   res.status(200).json({message:"Logged Out Successfully !"});
    }
    catch(error)
    {
        console.log("Eroor in logout controller ",error.message);
        res.status(500).json({error:"Internal server Error"});
    }
};
export const signup = async (req,res)=>{
    try{
         const {fullName,mail,password,confirmPassword,gender} = req.body;
        
         const email = mail.toLowerCase();
         if(password!==confirmPassword)
         {
            throw new Error("Passwords does not match");
         }
         const user = await User.findOne({mail});
         if(user)
         {
            throw new Error("User Already exist");
         }
         const salt = await bcryptjs.genSalt(10);
         const hashedPassword = await bcryptjs.hash(password,salt);
        //  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
        //  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;
         const newuser = new User({
            fullName,
            mail:email,
            password:hashedPassword,
            gender,
            profilePic: ""
         });
         if(newuser)
         {
         GenerateTokenAndSetCookie(newuser._id,res);
         await newuser.save();
         return res.status(201).json(
            {
                _id:newuser._id,
                fullName:newuser.fullName,
                description:newuser.description,
                profilePic:newuser.profilePic
            }
         );
        }
         else{
           throw new Error("Invalid user data");
           
         }
    }
    catch(error)
    {
        res.status(500).json(error.message);
    }
}
