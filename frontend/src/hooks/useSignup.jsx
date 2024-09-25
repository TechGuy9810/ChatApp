import { useState } from 'react'
import axios from "axios";
import {toast} from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
function useSignup() {
  const {setAuthUser} = useAuthContext();
  const [loading,setLoading] = useState(false);
  const signup = async({fullName,mail,password,confirmPassword,gender})=>{
    try{
        const res = await axios.post(`/api/auth/signup`,{fullName,mail,password,confirmPassword,gender});
        const data = res.data;
        localStorage.setItem("chat-user",JSON.stringify(data));
        setAuthUser(data);
        toast.success("Successfully Registered")
    }
    catch(error)
    {
      toast.error(error.response.data);
    } finally{
      setLoading(false);
    }
  }
  return {loading,signup};
}

export default useSignup;