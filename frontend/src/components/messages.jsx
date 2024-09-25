import React, { useEffect, useRef,useContext } from 'react'
import Message from './message.jsx'
import useGetMessages from '../hooks/useGetMessages'
import useListenMessage from '../hooks/useListenMessage.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
const Messages =()=> {
  const {theme} = useContext(ThemeContext);
  const {messages,loading} = useGetMessages();
  useListenMessage();
  const lastMessageRef = useRef(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView(
        {
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  )
  return (
    <div className={`px-4 flex-1 overflow-y-scroll lg:scrollbar-default scrollbar-hide ${theme==="light"?"bg-white":"bg-slate-700"} h-[85%] pt-2`}>
{!loading && messages.length>0 && (messages.map((t)=>(
<div key={t._id} ref={lastMessageRef}>
  <Message message={t}/>
</div>)))}
{!loading && messages.length===0 &&(<p className='font-bold text-slate-500 h-full flex items-center justify-center text-5xl'>Start Conversation</p>)}
    </div>
  )
}

export default Messages;