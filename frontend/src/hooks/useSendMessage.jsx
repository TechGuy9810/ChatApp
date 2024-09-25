import { useState } from "react"
import useConversation from "../../zustand/useConversation";
import axios from "axios";
import { toast } from "react-hot-toast";

const useSendMessage = () => {
const [loading,setLoading] =useState(false);
const {setMessages,selectedConversation,messages} = useConversation();

const sendMessage = async(message)=>{
    setLoading(true);
    try{
         const res = await axios.post(`/api/messages/send/${selectedConversation._id}`,{message});
         const data = res.data;
         if(data.error) throw new Error(data.error);
         setMessages([...messages,data]);
    }
    catch(error)
    {
          toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
}
return {sendMessage,loading};
}

export default useSendMessage
