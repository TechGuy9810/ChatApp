import { useState } from 'react'
import axios from "axios";
import {toast} from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
function useLogin() {
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const login = async({mail,password})=>{
   const sucess = handleInputErrors({mail,password});
    if(!sucess) return;
    try{
        const res = await axios.post(`/api/auth/login`,{mail,password});
        const data = res.data;
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);
        toast.success("Login Successfull")
    }
    catch(error)
    {
        toast.error(error.response.data);
    } finally{
      setLoading(false);
    }
  }
  return {loading,login};
}

export default useLogin;

function handleInputErrors({mail,password})
{
  if(!mail || !password)
  {
    toast.error('Please fill all the fields');
    return false;
  }
  if(password.length<3)
  { 
    toast.error('password must be at least 3 characters');
    return false;
  }
  return true;
}