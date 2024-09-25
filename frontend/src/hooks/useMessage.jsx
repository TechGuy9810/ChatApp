import { useState } from 'react'
import axios from "axios";
import { useAuthContext } from '../context/AuthContext';
function useMessage() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const Message = async({userName,password})=>{
   const sucess = handleInputErrors({userName,password});
    if(!sucess) return;
    try{
        const res = await axios.get(`/api/auth/getMessage`,{userid});
        const data = res.data;
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);
        toast.success("Message Successfull")
    }
    catch(error)
    {
      toast.error(error.message);
    } finally{
      setLoading(false);
    }
  }
  return {loading,Message};
}

export default useMessage;