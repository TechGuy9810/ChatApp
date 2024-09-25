import mongoose from 'mongoose';
 const friendListSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
},
friendId:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:"User"
}
 },{timestamps:true});
 const Friends = mongoose.model("Friends",friendListSchema);
 export default Friends;