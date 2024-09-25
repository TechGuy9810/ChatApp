import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../hooks/useGetConversation'
import {useAuthContext} from '../context/AuthContext.jsx';
function Conversations() {
  const {authUser} = useAuthContext();
  const id = authUser._id;
  const {loading,conversation} = useGetConversation(id);
  return (
    <>
    <div className='sm:w-screen lg:w-full sm:px-2 flex flex-col h-screen overflow-y-scroll scrollbar-hide overflow-x-hidden'>
      {loading===true ?<span className='loading loading-spinner mx-auto'></span>:((conversation.length>0)?(
        conversation.map((t,idx)=>{
        return(
          <Conversation props={t} key={t._id} lastIdx={idx === conversation.length-1} id={t._id}/>
        );
      })
      ):(<p className='text-[#4f46e5] font-semibold'>No Friends</p>))
    }
  </div>
  </>
  );
}

export default Conversations