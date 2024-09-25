import User from "../models/userModel.js";
import Friends from "../models/friendList.js";
import uploadFile from "../utils/cloudinary.js";
export const getUserForSidebar  =async (req,res)=>{
try{

    const loggedInUserId = req.user._id;
    const [allUsers] = await Friends.find({userId:loggedInUserId}).populate('friendId').select('friendId');
    if(allUsers===undefined) return res.status(200).json([]);

    const friends = allUsers.friendId.map((e)=>e);
    if(!allUsers) return res.status(200).json([]);
    
    res.status(200).json(friends);
}
catch(error)
{
    console.log("Error in userController ",error);
res.status(500).json({error:"Internal server error"});
}
}
export const findUsers  =async (req,res)=>{
    try{
    
        const loggedInUserId = req.user._id;
        const allFriends = await Friends.find({userId:loggedInUserId}).select('friendId');
        const toBeFriends =  allFriends.map((e)=>e.friendId);
        const requiredUsers = await User.find({$and:[{_id:{$nin:toBeFriends[0]}},{_id:{$ne:loggedInUserId}}]});
        res.status(200).json(requiredUsers);
    }
    catch(error)
    {
        console.log("Error in userController ",error);
    res.status(500).json({error:"Internal server error"});
    }
    }
export const findUsersForGroup = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const UsersForGroup = await User.find({_id:{$ne:loggedInUserId}});
        res.status(200).json(UsersForGroup);
    }
    catch(error)
    {
        res.status(500).json({error:"Internal Server Error"});
    }
}
export const AddUser=async (req,res)=>{
    try{
        const isUser = await Friends.find({userId:req.body.userId});
        if(isUser.length!==0){
        await Friends.updateOne({userId:req.body.userId,friendId:{$ne:req.body.friendId}},{$push:{friendId:req.body.friendId}});
        }
        if(isUser.length===0){
            const newFriends = new Friends(req.body);
            newFriends.save();
        }
        res.status(200).json("User Added to the Chat!");
    }
    catch(error)
    {
    res.status(500).json({error:"Internal server error"});
    }
    }

export const updateProfile = async(req,res)=>{
    
    try{
        const fullName = req.body.details.fullName;
        const description = req.body.details.description;
        const id = req.user._id;
        const update = await User.updateOne({_id:id},{$set:{fullName:fullName,description:description}});
        if(!update) throw new Error("Invalid Input");
        
        const newProfile = await User.findOne({_id:id});
        res.status(200).json(
            {
                _id: newProfile._id,
                fullName:newProfile.fullName,
                description:newProfile.description,
                profilePic:newProfile.profilePic
            });
    }
    catch(error)
    {
        res.status(500).json("Failed to update.");
    }
}
export const updateProfilePhoto = async(req,res)=>{
    
    try{
        const id = req.params.id;
        const result = await uploadFile(req.file.path);
        const file = result;
        const update = await User.updateOne({_id:id},{$set:{profilePic:`${file}`}});
        if(!update) throw new Error("Invalid Input");
        
        const newProfile = await User.findOne({_id:id});
        res.status(200).json(
            {
                _id: newProfile._id,
                fullName:newProfile.fullName,
                description:newProfile.description,
                profilePic:newProfile.profilePic
            });
    }
    catch(error)
    {
        res.status(500).json("Failed to update.");
    }
}