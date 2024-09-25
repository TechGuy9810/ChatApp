import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import useGetUsers from '../hooks/useGetUsers';
import toast from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';
import useAddUser from '../hooks/useAddUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark } from '@fortawesome/free-solid-svg-icons';
const AddUser = ({closeAddUser}) => {
  const {authUser} = useAuthContext();
  const id = authUser._id;
  const {loading,users} = useGetUsers(id);
  const {friends,setFriends} = useConversation();
  const [search,setSearch] = useState('');
  const {AddUser} = useAddUser();
  const handleAddUser=(e) => {
       AddUser({userId:id,friendId:e.target.id})
};
  const handleSubmit =(e)=>{
    const talk = users.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
    if(!search) return;
    else if(search.length<3)
    {
      toast.error("Atleast Enter 3 Character");
    }
    else if(talk)
    {
      setFriends(talk);
      setSearch('');
    }
    else{
      toast.error("No User Found!");
    }
    
  }
  return (
    <>
    {loading?(""):(<>
      <div className='top-0 bottom-0 left-0 right-0 m-auto absolute w-full h-screen flex z-40 bg-slate-500 opacity-55 '></div>
    <div className=' p-4 rounded fixed top-0 bottom-0 left-0 right-0 m-auto lg:w-96 w-80 h-80 lg:h-80 sm:h-max sm:w-max bg-slate-500 gap-2 flex flex-col z-50 opacity-100'>
      <div className='flex items-center justify-end m-0 p-0'><FontAwesomeIcon icon={faXmark} className='size-5 cursor-pointer text-slate-200 font-semibold' onClick={closeAddUser}/></div>
      <input className='p-2 rounded border-none outline-none text-lg w-full' type='text' placeholder='UserName' name='username'value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter")
                handleSubmit();
            }}
      onChange={(e)=>setSearch(e.target.value)}/>
    {friends?(
 <div className='user mt-5 flex items-center justify-between'>
   <div className="detail flex items-center gap-4">
       <img src={friends.profilePic===""?'/user.jpg':friends.profilePic} className='w-10 h-10 rounded-full object-cover'/>
       <span className='text-white text-base'>{friends.fullName}</span>
   </div>
   <button id={friends._id} onClick={handleAddUser} className='p-2 rounded-lg h-10 min-w-15 bg-white border-none cursor-pointer text-[#4139dd]  text-base'>Add</button>
 </div>
    ):('')
    }
    <div className='my-0 py-0 h-[2px] bg-slate-200 w-full'></div>
    <div className='flex flex-col h-full overflow-y-scroll overflow-x-hidden scrollbar-hide'>
    {
        users.map((user)=>{
          return(
            <div className='user mt-2 flex items-center justify-between'>
            <div className="detail flex items-center gap-4">
                <img src={user.profilePic===""?'/user.jpg':user.profilePic} className='w-10 h-10 rounded-full object-cover'/>
                <span className='text-white text-base'>{user.fullName}</span>
            </div>
            <button id={user._id} onClick={handleAddUser} className='p-2 rounded-lg h-10 min-w-15 bg-white border-none cursor-pointer text-[#4139dd] text-base font-bold'>Add</button>
          </div>     
          )
        })
      }
      </div>
  </div>
   </> )}
    </>
  )
}

export default AddUser
