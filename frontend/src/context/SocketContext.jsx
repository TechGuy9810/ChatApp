import { createContext, useEffect, useState,useContext } from "react";
import {useAuthContext} from './AuthContext.jsx';
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = ()=>{
return useContext(SocketContext);
};
export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUser,setOnlineUser] = useState([]);
    const {authUser} = useAuthContext();
    useEffect(()=>{
     if(authUser)
     {
        const socket = io("https://chatapp-18yf.onrender.com/",{
            query:{
                userId :authUser._id,
            }
        });
        setSocket(socket);
        socket.on("getOnlineUser",(users)=>{
            setOnlineUser(users);
        });
        return ()=>socket.close();
     }
     else{
        if(socket){
            socket.close();
            setSocket(null);
        }
     }
    },[authUser])
    return(
        <SocketContext.Provider value={{socket,onlineUser}}>
            {children}
        </SocketContext.Provider>
    )
}
