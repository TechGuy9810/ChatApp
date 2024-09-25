import React, { useContext, useEffect, useState } from 'react'
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import extractTime from '../utility/extractTime';
import { useAuthContext } from '../context/AuthContext.jsx';
import { ThemeContext } from '../context/ThemeContext';
function Conversation({props,lastIdx,id}) {
  const {authUser} = useAuthContext();
  const {selectedConversation,setSelectedConversation,setHideSideBar,setHideMessageContainer} = useConversation();
  const isSelected = selectedConversation?._id===id;
  const {onlineUser} = useSocketContext();
  const isOnline = onlineUser.includes(id);
  const {theme} = useContext(ThemeContext);
  const [lastMessage,setLastMessage] = useState(
    {
      lastmessage:'',
      time:'',
      senderId:'',
      type:''
    }
  );
  const handleClick =()=>{
    setSelectedConversation(props);
    setHideSideBar("lg:flex lg:flex-col hidden");
    setHideMessageContainer("");
}
  useEffect(()=>{
const handler = async()=>{
try{
const data = await axios.get(`/api/messages/lastMessage/${id}`);
if(data!=='')
{
  setLastMessage({lastmessage:data.data.message,time:data.data.createdAt,senderId:data.data.senderId,type:data.data.mimeType})
}
}
catch(error){
  toast.error("Error updating last Message!");
}
}
handler();
  },[selectedConversation])
  return (
    <>
<div className={`flex gap-5 items-center bg-none ${theme==="light"?"hover:bg-slate-200":"hover:bg-slate-500"} rounded p-2 cursor-pointer lg:h-[4.5rem] h-[4.2rem] pr-2 w-screen lg:w-full box-border
${(isSelected)? `${theme==="light"?"bg-slate-300":"bg-slate-500"}`:""}`}
onClick={handleClick}>
<div className={`avatar ${isOnline ?"online":""}`}>
  <div className="lg:w-14 w-10 rounded-full">
    <img src={`${props.profilePic===""?'/user.jpg':props.profilePic}`} />
  </div>
</div>
<div className='flex flex-col flex-1 w-full'>
  <div className='flex'>
    <p className={`font-bold ${theme==="light"?"text-slate-600":"text-white"} text-lg`}>{props.fullName}</p>
  </div>
  <div className='flex'>
    <p className={`${theme==="light"?"text-slate-500":"text-slate-100"} text-sm w-auto`}>{lastMessage.senderId===authUser._id?"You:":''}</p>
    <p className={`${theme==="light"?"text-[#4f46e5]":"text-slate-100"} text-sm w-full`}>&nbsp;<span className='font-bold'>{lastMessage.lastmessage}</span></p>
    <p className={`${theme==="light"?"text-slate-700":"text-slate-100"} text-sm flex justify-end w-1/6`}>{(lastMessage.time==='')?'':extractTime(lastMessage.time)}</p>
  </div>
</div>
</div>
{!lastIdx &&<div className='my-1 py-0 h-[1px] bg-slate-200 w-full'></div>}
</>
  )
}

export default Conversation