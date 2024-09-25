import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";
const useSendFile = () => {
const {authUser} = useAuthContext();
const {setMessages,selectedConversation,messages} = useConversation();
const [loadingFile,setLoadingFile] =useState(false);
const sendFile = async(formData)=>{
    setLoadingFile(true);
    try{
         const res = await axios.post(`/api/messages/sendFile/${selectedConversation._id}?user=${authUser._id}`,formData);
         const data = res.data;
         if(data.error) throw new Error(data.error);
         setMessages([...messages,data]);
    }
    catch(error)
    {
          toast.error(error.message);
    }
    finally{
        setLoadingFile(false);
    }
}
return {sendFile,loadingFile};
}

export default useSendFile;
