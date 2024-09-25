import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';
const useUpdateProfile = () => {
  const {setAuthUser} = useAuthContext();
const updateDetails = async (details)=>{
    try{
    const res = await axios.post(`/api/user/updateProfile`,{details});
    if(res.error) throw new Error(res.error);
    
    localStorage.setItem("chat-user",JSON.stringify(res.data));
    setAuthUser(res.data);
    toast.success("Profile is Updated!");
  }
  catch (err) {
    toast.error(err.message);
  }
  }
return { updateDetails };
}

export default useUpdateProfile;
