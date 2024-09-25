import React, { useEffect, useContext} from 'react'
import Messages from './messages.jsx';
import MessageInput from './MessageInput.jsx';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiArrowRight,FiArrowLeft } from "react-icons/fi";
import useConversation from '../../zustand/useConversation.jsx';
import ChatDetail from './ChatDetail.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';
import { useSocketContext } from '../context/SocketContext';
import { ThemeContext } from '../context/ThemeContext.jsx';
function MessageContainer() {
  const {selectedConversation,setSelectedConversation,typing,hideMessageContainer,setHideMessageContainer,setHideSideBar,hideInfo,setHideInfo,setHideProfile} = useConversation();
  const {onlineUser} = useSocketContext();
  const {theme} = useContext(ThemeContext);
  useEffect(()=>{
    return ()=> setSelectedConversation(null);
  },[setSelectedConversation]);
  const handleShowConversation = ()=>{
    setHideSideBar("flex flex-col");
    setHideMessageContainer("hidden");
  }
  useEffect(()=>{
    if(window.innerWidth>700)
    {
      setHideSideBar("flex flex-col");
      setHideMessageContainer("hidden");
      setHideProfile("lg:flex lg:flex-col");
    }
    },[]);
  return (
    <>
    <div className={`lg:flex lg:flex-col w-full lg:h-full lg:rounded-xl transition ${hideMessageContainer} ease-in-out duration-2000 delay-150 ${theme==="light"?"bg-white":"bg-slate-700"} overflow-hidden`}>
{!selectedConversation ?(<NoChatSelected/>):(
  <>
      <div className='flex flex-row w-full bg-[#4f46e5] h-16 justify-between items-center px-4 sticky top-0 z-[0] py-6 lg:rounded-t-lg lg:rounded-b-none'>
      <div className='flex gap-2 items-center h-full'>
        {(hideMessageContainer===""&&window.innerWidth<700)&&<div>
        <FiArrowLeft  className='text-white size-5 cursor-pointer' onClick={handleShowConversation}/>
        </div>}
      <div className={`avatar ${onlineUser.includes(selectedConversation._id)?"online":""}`}>
  <div className="w-14 rounded-full">
    <img src={`${selectedConversation.profilePic===""?'/user.jpg':selectedConversation.profilePic}`} />
  </div>
</div>
<div>
  <p className='text-white items-center font-bold'>{selectedConversation.fullName}</p>
<p className='text-green-500 text-sm'>{onlineUser.includes(selectedConversation._id)?(typing?("Typing..."):"Online"):""}</p>
</div>
      </div>
<div className='group text-red-800f'>{!hideInfo?
<BsThreeDotsVertical className='text-white size-5 cursor-pointer' onClick={()=>
  {
    setHideInfo((prev)=>!prev)
    setHideMessageContainer("hidden")
}}/>:
<FiArrowRight  className='text-white size-5 cursor-pointer' onClick={()=>setHideInfo(!hideInfo)}/>
}
</div>
    </div>
    <Messages/>
    <MessageInput/>
  </>
)}
    </div>
    {hideInfo&&<ChatDetail/>}
    </>
  )
}

export default MessageContainer

const NoChatSelected = ()=>{
  const {authUser} = useAuthContext();
  return(
<div className='flex items-center justify-center w-full h-full'>
  <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
    <p className='text-slate-500 text-6xl'>Welcome <span className='text-[#5852d5]'>{authUser.fullName}! </span></p>
    <p className='text-slate-500 text-4xl'>Select a User to Chat</p>
  </div>
</div>
  );
};