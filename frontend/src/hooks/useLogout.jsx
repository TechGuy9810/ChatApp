import axios from 'axios';
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
const useLogout = () => {
const [loading,setLoading] = useState(false);
const {setAuthUser}= useAuthContext();
const logout = async()=>{
    setLoading(true)
    try{
          const res = await axios.post("/api/auth/logout");
          const data = res.data;
          if(data.error)
          {
            throw new Error(data.error)
          }
          localStorage.removeItem("chat-user");
          setAuthUser(null);
          toast.success(data.message);
    }
    catch(error)
    {
     toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
    setLoading(false);
}
return{ loading,logout}
};

export default useLogout
