import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';
const useUpdatePhoto = () => {
const {authUser,setAuthUser} = useAuthContext();
const updatePhoto = async (formData)=>{
    try{
      const res = await axios.post(`/api/user/updateProfilePhoto/${authUser._id}`,formData);
      localStorage.setItem("chat-user",JSON.stringify(res.data));
      setAuthUser(res.data);
      toast.success("Profile is Updated!");
  }
  catch (err) {
    toast.error(err.message);
  }
  }
return { updatePhoto };
}

export default useUpdatePhoto;
