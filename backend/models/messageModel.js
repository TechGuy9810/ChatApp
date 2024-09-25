import mongoose from 'mongoose';
 const messageSchema = new mongoose.Schema({
senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
},
receiverId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
},
file:{
    type : String,
    default : ""
},
mimeType:{
type : String,
default:""
},
message:{
    type:String,
    default:""
}
 },{timestamps:true});
 const Message = mongoose.model("Message",messageSchema);
 export default Message;