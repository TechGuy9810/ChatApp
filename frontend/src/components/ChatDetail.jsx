import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp,faAngleDown, faDownload, faFile,faXmark} from '@fortawesome/free-solid-svg-icons'
import useConversation from '../../zustand/useConversation.jsx';
import useGetFile from '../hooks/useGetFile.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
const ChatDetail = () => {
  const {selectedConversation,hideMessageContainer,setHideMessageContainer,setHideInfo} = useConversation();
  const {loading,files} = useGetFile();
  const {theme} = useContext(ThemeContext);
  const [hiddenp,setHiddenp] =useState('hidden');
  const [hiddenf,setHiddenf] = useState('hidden');
  useEffect(()=>{
       setHiddenf('hidden');
       setHiddenp('hidden');
  },[selectedConversation])
  return (
    <div className={`${theme==="light"?"bg-white":"bg-slate-800"} z-50 flex flex-col lg:rounded-l-lg lg:rounded-r-lg h-screen lg:w-2/5 w-full transition ease-in-out duration-1000 lg:mx-2`}>
{(hideMessageContainer!==""&&window.innerWidth<700)&&
  <div>
    <FontAwesomeIcon icon={faXmark} className='w-5 h-5 text-slate-600 p-3' onClick={()=>{
      setHideMessageContainer("")
      setHideInfo(false)
    }}/>
  </div>
}
      <div className='User flex flex-col items-center lg:justify-start justify-center py-2 gap-2 lg:h-1/6 h-[20%]'>
        <div className='flex flex-row gap-2 items-center'>
         <img src={`${selectedConversation.profilePic===""?'/user.jpg':selectedConversation.profilePic}`} className='lg:w-10 lg:h-10 w-20 h-20 rounded-full object-cover' />
         </div>
         <div className='flex flex-row'>
         <p className={`flex font-bold ${theme==="light"?"text-slate-900":"text-white"}`}>{selectedConversation.fullName}</p>
         </div>
         <div className='flex flex-row'>
         <p className='flex text-slate-400'>Hey there I am using ChatApp</p>
         </div>
      </div>
      <div className='my-0 py-0 h-[1px] bg-slate-200 w-full'></div>
      {loading?("Loading..."):(
      <div className='info p-2 flex flex-col gap-4 lg:h-5/6 h-[80%]'>
      <div className='title flex items-center justify-between cursor-pointer ' onClick={()=>{setHiddenp(hiddenp==='hidden'?'flex':'hidden')}}>
            <span className='text-slate-500 text-lg font-bold'>Shared Photots</span>
            <FontAwesomeIcon icon={hiddenp==='hidden'?faAngleDown:faAngleUp} className='w-3 h-3 rounded-full p-1 bg-slate-200 text-black'/>
        </div>
      <div className={`option ${hiddenp} flex-col gap-4 overflow-y-scroll scrollbar-hide max-h-52`}>
      {
        files.map((e,i)=>{
          if(files[files.length-1-i].mimeType.split('/').shift()=="image"){
return(
  <>
        <div className='photots flex flex-col gap-4' key={i}>
        <div className='phototItem flex items-center justify-between '>
            <div className='PhotoDetail flex items-center gap-2'>
            <img className='w-8 h-8 rounded-sm object-cover' src={`${files[files.length-1-i].file}`}/>
            <span className={`${theme==="light"?"text-slate-500":"text-slate-300"}`}>{files[files.length-1-i]._id}</span>
         </div>
         <a id={files[files.length-1-i]._id} className='text-none' href={`${files[files.length-1-i].file}`} target="_blank">
            <FontAwesomeIcon icon={faDownload} className='w-3 h-3 rounded-full cursor-pointer p-1 bg-slate-200 text-black'/>
          </a>
        </div>
            </div>
  </>)
    }
    })
    }
    {files.filter((e)=>e.mimeType!=='image').length===0?(<span className='text-slate-500 text-sm'>No Photos</span>):("")}
            </div>
            <div className='my-0 py-0 h-[1px] bg-slate-200 w-full'></div>
            <div className='title flex items-center justify-between cursor-pointer' onClick={()=>setHiddenf(hiddenf==='hidden'?'flex':'hidden')}>
            <span className='text-slate-500 text-lg font-bold'>Shared Files</span>
            <FontAwesomeIcon icon={hiddenf==='hidden'?faAngleDown:faAngleUp} className='w-3 h-3 rounded-full cursor-pointer p-1 bg-slate-200 text-black'/>
        </div>
            <div className={`option ${hiddenf} flex-col gap-4 overflow-y-scroll scrollbar-hide max-h-52`}>
        {
        files.map((e,i)=>{
 if(files[files.length-1-i].mimeType.split('/').shift()==="application"||files[files.length-1-i].mimeType.split('/').shift()==="video"){
return(
  <>
          <div className='photots flex flex-col gap-4' key={i}>
        <div className='phototItem flex items-center justify-between '>
            <div className='PhotoDetail flex items-center gap-2'>
            <FontAwesomeIcon icon={faFile} className='cursor-pointer text-black w-10 h-6 rounded-sm object-cover'/>
            <span>{files[files.length-1-i]._id}</span>
         </div>
         <a id={files[files.length-1-i]._id} className='text-none' href={`${files[files.length-1-i].file}`} target="_blank">
         <FontAwesomeIcon icon={faDownload} className='w-3 h-3 rounded-full cursor-pointer p-1 bg-slate-200 text-black'/>
         </a>
        </div>
            </div>
  </>
  )
    }
    })
    }
    {files.filter((e)=>e.mimeType!=='image').length===0?(<span className='text-slate-500 text-sm'>No Files</span>):("")}
      </div>
            </div>
            )}
    </div>
  )
}

export default ChatDetail
