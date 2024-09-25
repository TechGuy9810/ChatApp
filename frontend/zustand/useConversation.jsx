import {create} from 'zustand';


const useConversation = create((set)=>({
selectedConversation:null,
setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
messages:[],
setMessages:(messages)=>set({messages}),
hideMessageContainer:"hidden",
setHideMessageContainer:(hideMessageContainer)=>set({hideMessageContainer}),
hideSideBar:"flex flex-col",
setHideSideBar:(hideSideBar)=>set({hideSideBar}),
hideInfo:false,
setHideInfo:(hideInfo)=>set({hideInfo}),
friends:null,
setFriends:(friends)=>set({friends}),
hideProfile:"lg:flex lg:flex-col",
setHideProfile:(hideProfile)=>set({hideProfile}),
updateConversation:null,
setUpdateConversation:(updateConversation)=>set({updateConversation}),
typing:false,
setTyping:(typing)=>set({typing})
}));

export default useConversation;

