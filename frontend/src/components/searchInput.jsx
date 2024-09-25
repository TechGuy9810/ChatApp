import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAdd, faSubtract,faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import useGetConversation from '../hooks/useGetConversation';
import useConversation from '../../zustand/useConversation';
import { toast } from 'react-hot-toast';
import AddUser from "../components/addUser.jsx";
function SearchInput() {
  const [search,setSearch] = useState('');
  const [add,setAdd] = useState(false);
  const {setSelectedConversation,setFriends} = useConversation();
  const {conversation} = useGetConversation();
  const closeAddUser = ()=>setAdd(false);
  const handleSubmit =(e)=>{
    if(conversation.length===0)
    {
      return;
    }
    const talk = conversation.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
    if(!search) return;
    if(search.length<3)
    {
      toast.error("Atleast Enter 3 Character");
    }
    if(talk)
    {
      setSelectedConversation(talk);
      setSearch('');
    }
    else{
      toast.error("No User Found!");
    }
    
  }
  return (
    <div className='flex items-center gap-2 px-2 '>
      <input type="text" value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter")
                handleSubmit();
            }}
      onChange={(e)=>setSearch(e.target.value)}
      placeholder='Search . . .' className='w-11/12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 outline-none lg:h-9 md:h-12 h-10'/>
      {
        add?(<button className="btn btn-sm flex bg-[#4f46e5] hover:bg-[#4139dd] lg:h-9 md:h-12 h-10" onClick={()=>{
          setAdd((prev)=>!prev)
          setFriends('')
        }}> <FontAwesomeIcon icon={faSubtract} className='size-5 cursor-pointer text-white'/></button>):(<button className="btn btn-sm flex bg-[#4f46e5] hover:bg-[#4139dd] lg:h-9 md:h-12 h-10" onClick={()=>{
          setAdd((prev)=>!prev)
        }}> <FontAwesomeIcon  icon={faAdd} className='size-5 cursor-pointer text-white'/></button>)
      }
      {add && <AddUser closeAddUser={closeAddUser}/>}
      <button className="btn btn-sm flex bg-[#4f46e5] hover:bg-[#4139dd] lg:h-9 md:h-12 h-10"><FontAwesomeIcon icon={faPeopleGroup} className='size-5 cursor-pointer text-white'/></button>
      </div>
  );
}

export default SearchInput
