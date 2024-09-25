import React, { useRef, useState,useContext } from 'react'
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout.jsx';
import useUpdateProfile from '../hooks/useUpdateProfile';
import useUpdatePhoto from '../hooks/useUpdatePhoto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useConversation from '../../zustand/useConversation';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';
const SelfProfile = () => {
  let ref = useRef()
  const {setHideProfile,setHideSideBar,hideProfile} = useConversation();
  const {theme} = useContext(ThemeContext);
  const {logout} = useLogout();
  const {updatePhoto} = useUpdatePhoto();
  const {authUser} = useAuthContext();
  const [details,setDetails] = useState({
     fullName:authUser.fullName,
     description:authUser.description
  });
  const [file,setFile] = useState("");
  const {updateDetails} = useUpdateProfile();
  const handleUpdate = ()=>{
    updateDetails(details);
  }
   const handlePhoto = ()=>{
    const formData = new FormData();
    formData.append("file", file);
    updatePhoto(formData);
    setFile("");
   }
   const cancelPhoto = ()=>{
    ref.current.value=""    
    setFile("");
   }
    return (
        <div className={`lg:w-2/6 ${hideProfile} h-full left-0 lg:rounded-lg lg:mr-2 ${theme==="light"?"bg-white":"bg-slate-800"} pl-2 pr-2`}>
{(window.innerWidth<700||hideProfile==="lg:flex lg:flex-col hidden")&&
  <div>
    <FontAwesomeIcon icon={faArrowLeft} className='w-5 h-5 text-slate-600 p-3' onClick={()=>{
      setHideProfile("lg:flex lg:flex-col hidden")
      setHideSideBar("flex flex-col")
    }}/>
  </div>
}
          <div className='User flex flex-col items-center py-2 gap-2'>
            <div className={`flex flex-row items-center`}>
            <label htmlFor='uploadFile'>
             {file!==""?(<img className='w-20 h-20 rounded-full object-cover cursor-pointer' src={URL.createObjectURL(file)}/>):(<img className='w-20 h-20 rounded-full object-cover cursor-pointer' src={`${authUser.profilePic===""?'/user.jpg':authUser.profilePic}`}/>)}
             </label>
             <input ref={ref} type='file' id='uploadFile' name='file' className='hidden' onChange={(e)=>setFile(e.target.files[0])}/>
             </div>
             {file!==''&&file!==undefined&&
             <div className='flex lg:w-[60%] w-[95%] justify-between items-center lg:h-[1.9rem] sm:h-[1.8rem]'>
             <button onClick={handlePhoto} className='flex items-center justify-center w-[45%] h-full bg-[#4f46e5] text-white rounded-md'>save</button>
             <button onClick={cancelPhoto} className='flex items-center justify-center w-[45%] h-full bg-[#4f46e5] text-white rounded-md'>cancel</button>
             </div>
}
             <div className={`flex w-full justify-center items-center flex-col `}>
             <input type='text' className={`capitalize text-lg p-1.5 outline-none w-full text-center [&::-webkit-input-value]:text-center [&::-webkit-input-value]:font-bold [&::-webkit-input-value]:text-slate-200 ${theme==="light"?"bg-white text-slate-600":"bg-slate-800 text-slate-200"}`}
                placeholder="Name" value={details.fullName|| ''} onChange={(e)=>setDetails({...details,fullName:e.target.value})}/>
            <input type='text' className={`text-md p-2.5 outline-none w-full text-center [&::-webkit-input-value]:text-center [&::-webkit-input-value]:text-slate-200 ${theme==="light"?"bg-white text-slate-600":"bg-slate-800 text-slate-200"}`}
               placeholder="Description" value={details.description|| ''} onChange={(e)=>setDetails({...details,description:e.target.value})}/>
             </div>
          </div>
          <div className={`flex flex-col gap-[0.45rem]`}>
          {(details.fullName===authUser.fullName&&details.description===authUser.description)?(""):(<button className='flex items-center justify-center w-full h-10 bg-[#4f46e5] text-white rounded-md' onClick={handleUpdate}>Update</button>)}
          <button className='flex items-center justify-center w-full h-10 font-semibold bg-[#4f46e5] text-white rounded-md hover:bg-[#3b32e8]' onClick={logout}>Logout</button>
        </div>
        </div>
      )
}

export default SelfProfile;
          