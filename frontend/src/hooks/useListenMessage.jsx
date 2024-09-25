import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext"

const useListenMessage = () => {
    const {socket}  = useSocketContext();
    const {messages,setMessages} = useConversation();
    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake = true;
            setMessages([...messages,newMessage]);
        });
        socket?.on("uploaded",(newMessage)=>{
            setMessages([...messages,newMessage]);
          });
        return ()=> {
            socket?.off("newMessage");
            socket?.off("uploaded");
        }
    },[socket,setMessages,messages])
}

export default useListenMessage
