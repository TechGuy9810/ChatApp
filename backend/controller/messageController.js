import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';
import { getReceiverSocketId , io} from '../socket/socket.js';
import uploadFile from '../utils/cloudinary.js';
export const sendMessage = async(req,res)=>{
    try{
          const{message} = req.body;
          const receiverId = req.params.id;
          const senderId = req.user.id;
         let conversation = await Conversation.findOne({
          participants:{$all:[senderId,receiverId]}
          });
          if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
          }
          const newMessage = new Message({
            conversationId:conversation._id,
            senderId,
            receiverId,
            message,
          }) 
          if(newMessage){
            conversation.messages.push(newMessage._id);
          }
        await Promise.all([newMessage.save(),conversation.save()]);

          const receiverSocketId = getReceiverSocketId(receiverId);
          if(receiverSocketId)
          {
            io.to(receiverSocketId).emit("newMessage",newMessage);
          }
          res.status(201).json(newMessage);
    }
    catch(error)
    {
        console.log("Error in message Controller ",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
export const sendFile = async(req,res)=>{
  try{
        const receiverId = req.params.id;
        const senderId = req.query.user;
        const result = await uploadFile(req.file.path);
        const file = result;
        const mimeType = req.file.mimetype;
        const message = req.body.message;
        let conversation = await Conversation.findOne({
          participants:{$all:[senderId,receiverId]},
        });
        if(!conversation){
          conversation = await Conversation.create({
              participants:[senderId,receiverId],
          })
        }
        const newMessage = new Message({
          conversationId:conversation._id,
          senderId,
          receiverId,
          file,
          mimeType,
          message
        }) 
        if(newMessage){
          conversation.messages.push(newMessage._id);
        }
        await Promise.all([newMessage.save(),conversation.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId)
        {
          io.to(receiverSocketId).emit("uploaded",newMessage);
        }
        res.status(201).json(newMessage);
  }
  catch(error)
  {
      console.log("Error in message Controller ",error.message);
      res.status(500).json({error:"Internal Server Error"});
  }
}
export const getMessage = async (req,res)=>{
try{
 const userToChatId = req.params.id;
 const senderId = req.user._id;
 const conversation = await Conversation.findOne({
  participants:{$all:[senderId,userToChatId]},
 }).populate("messages");
 if(!conversation) return res.status(200).json([]);
 const messages = conversation.messages;
 res.status(200).json(messages);

}
catch(error)
{
  console.log("Error in message Controller ",error.message);
  res.status(500).json({error:"Internal Server Error"});
}
}

export const downloadFile = async(req,res)=>{
try{
const id = req.params.id;
const file = await Message.findById({_id:id});
res.download(file.file);
}
catch(error)
{
  res.status(500).json({error:"Internal Server Error"});
}
}

export const getFiles = async (req,res)=>{
  try{
    const conversationId = req.params.id;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,conversationId]},
     }).populate("messages");

    if(!conversation) return res.status(200).json([]);

    const files = conversation.messages.filter((e)=>e.file!=="");
    const reqFiles =  files.map(({_id,mimeType,file,createdAt})=>({_id,mimeType,file,createdAt}));
    res.status(200).json(reqFiles);
   }
   catch(error)
   {
     console.log("Error in message Controller ",error.message);
     res.status(500).json({error:"Internal Server Error"});
   }
}
export const lastFile = async(req,res)=>{
  try{
          const receiverId = req.params.id;
          const senderId = req.user._id;
          const lastConversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
           }).populate("messages");
          if(!lastConversation) return res.status(200).json("");

          const allmessages = lastConversation.messages.map(({message,createdAt,senderId,mimeType})=>({message,createdAt,senderId,mimeType}));
          const lastMessage = allmessages[allmessages.length-1]; 
          res.status(200).json(lastMessage);
  }
  catch(error)
  {
    console.log("Error in message Controller ",error.message);
    res.status(500).json({error:"Internal Server Error"});
  }
}