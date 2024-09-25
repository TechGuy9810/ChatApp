import React, { useEffect, useState } from 'react'
import useSendMessage from '../hooks/useSendMessage';
import useSendFile from '../hooks/useSendFile.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faImage,faPaperPlane, faFile, faXmark } from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react';
import useConversation from '../../zustand/useConversation.jsx';
import { useSocketContext } from '../context/SocketContext';
function MessageInput() {
  const [message,setMessage] = useState("");
  const [file,setFile] = useState("");
  const [displayFile,setDisplayFile] = useState('');
  const {loading,sendMessage} = useSendMessage();
  const {loadingFile,sendFile} = useSendFile();
  const {isBlock,selectedConversation,setTyping} = useConversation();
  const {socket} = useSocketContext();
  const [typingTimeout,setTypingTimeout] = useState(null);
  const [open,setOpen] = useState(false);
  useEffect(()=>{
    setDisplayFile('');
    setFile("");
    setMessage("");
  },[selectedConversation]);
  const handleSubmit = async (e)=>{
    e.preventDefault();
     if(message!=="" && file==='' || file===undefined)
     {
     setDisplayFile('');
     await sendMessage(message);
     }
     else if(file!=='')
     {
        setDisplayFile('');
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message",message);
        await sendFile(formData);
     }
     setMessage("");
     setFile("");
     e.target.reset();
  }
  const handleSubmitPhoto = async(e)=>{
    if(file!=='')
    {
       setDisplayFile('');
       const formData = new FormData();
       formData.append("file", file);
       formData.append("message",message);
       await sendFile(formData);
    }
    setMessage("");
    setFile("");
  }
  socket.on('Typing-started-server',()=>{
  setTyping(true);
  });
  socket.on('Typing-stopped-server',()=>{
  setTyping(false);
  });
  const handleInput = (e)=>{
    setMessage(e.target.value);
    socket.emit('typing-started',{recever:selectedConversation._id});
    if(typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(()=>{
    socket.emit('typing-stopped',{recever:selectedConversation._id});
    },1000));
  }
  const handleEmoji =(e)=>{
   setMessage((prev)=>prev+e.emoji);
   setOpen(false);
  }
  const cancelFile = ()=>{
    setDisplayFile('');
    setFile("");
  }
  return (
    <>
    {!isBlock?(
      <>  
      {
      (displayFile!=='')&&(
        file.type.split('/').shift()==='image'?(
<div className='w-[100%] h-[100%] absolute top-0 left-0 overflow-hidden bg-slate-700 bg-opacity-55 flex justify-center items-center'>
<img src={`${displayFile}`} className='rounded-sm bg-none lg:h-[87%] lg:w-[80%] h-[75%] w-[87%]' alt="image" />
<button onClick={handleSubmitPhoto}  className='absolute z-50 lg:bottom-24 bottom-10 right-4 lg:right-44 bg-slate-100 rounded-full p-3'>
          {(loading||loadingFile)?<div className='loading loading-spinner'></div>:<FontAwesomeIcon icon={faPaperPlane} className='size-7 cursor-pointer text-[#4f46e5]'/>}
</button>
</div>
        ):(
        <div className='w-[100%] h-[100%] absolute top-0 left-0 overflow-hidden bg-slate-700 bg-opacity-55 flex flex-col justify-center items-center'>
          <FontAwesomeIcon icon={faFile} className='size-72 cursor-pointer mb-2'/>
          <p className='lg:p-0 p-10 text-xl text-gray-500'>{file.name}</p>
          <button onClick={handleSubmitPhoto} className='absolute z-[999999] lg:bottom-24 bottom-10 right-4 lg:right-44 bg-slate-100 rounded-full p-3'>
          {(loading||loadingFile)?<div className='loading loading-spinner'></div>:<FontAwesomeIcon icon={faPaperPlane} className='size-7 cursor-pointer text-[#4f46e5]'/>}
</button>
        </div>)
      )
       }
             {displayFile!==''&&
      <div className='z-50 w-10 h-10 absolute lg:bottom-28 cursor-pointer lg:right-24 right-4 top-12 rounded-full overflow-hidden object-cover bg-slate-900 flex justify-center items-center' onClick={cancelFile}>
      <FontAwesomeIcon icon={faXmark} className='size-4 text-white'/>
      </div>
       }
      <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full flex items-center justify-around'> 
         <label htmlFor='uploadFile'>
          <FontAwesomeIcon icon={faImage} className='size-5 cursor-pointer text-slate-500'/>
          </label>
          <label htmlFor='uploadFile' className='hidden lg:flex'>
          <FontAwesomeIcon icon={faFile} className='size-5 cursor-pointer text-slate-500'/>
          </label>
          <input type='file' id='uploadFile' name='file' className='hidden' onChange={(e)=>{setFile(e.target.files[0])
             setDisplayFile('');
             if(e.target.files[0].type==='image/jpeg')
             {
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = ()=>{
                setDisplayFile(reader.result);
              }
            }
            else{
              setDisplayFile('file');
            }
          }} />
          <input type='text' className='border text-sm rounded-lg block lg:w-10/12 w-[75%] p-2.5 bg-slate-500 text-white outline-none'
          placeholder='Send Message'
          value={message}
          onChange={handleInput}
          />
          <div className='relative'>
          <FontAwesomeIcon icon={faSmile} className='size-5 cursor-pointer text-slate-500' onClick={()=>setOpen(prev=>!prev)}/>
          <div className='absolute bottom-10 right-0'><EmojiPicker open={open} onEmojiClick={handleEmoji} /></div>
          </div>
          <button type='submit' className='text-black'>
          {(loading||loadingFile)?<div className='loading loading-spinner'></div>:<FontAwesomeIcon icon={faPaperPlane} className='size-5 cursor-pointer text-slate-500'/>}
          </button>
      </div>
      </form>
    </>):(
      <div className='w-full flex items-center justify-around bg-[#4f46e5] rounded-b-lg'>
        <p className='text-2xl flex w-10/12 p-2.5 justify-center font-bold text-white'>Ubloclk to send Messages</p>
      </div>
    )}
    </>
  )
}

export default MessageInput