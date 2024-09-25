import React, { useContext } from 'react'
import {useAuthContext} from '../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import extractTime from '../utility/extractTime.js';
import { ThemeContext } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile} from '@fortawesome/free-solid-svg-icons';
function Message(props) {
  const {theme} = useContext(ThemeContext);
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const formttedTime = extractTime(props.message.createdAt);
  const fromMe = props.message.senderId===authUser._id;
  const chatClassName = fromMe ?'chat-end':'chat-start';
  const profilePic = fromMe ? authUser.profilePic:selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? 'bg-[#4f46e5]':"";
  const shakeClass = props.message.shouldShake?"shake":"";
  const type = props.message.mimeType.split('/').shift();
  return (
        <div className={`chat ${chatClassName}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={profilePic===''?'/user.jpg':profilePic} />
    </div>
  </div>
  <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} min-w-auto max-w-auto`}>
      {
      (type!==""&&type!=="image")?(<a href={`${props.message.file}`} className='h-2/5 lg:max-w-72 max-w-64 rounded-lg flex flex-col items-center'>
        <FontAwesomeIcon icon={faFile} className='size-32'/>
        <p>file</p>
        </a>):("")
    }
  {
    type==='image'?(
      <img src={`${props.message.file}`} alt="imageReceived" className='h-2/5 lg:max-w-72 max-w-64 rounded-lg' />
    ):("")
  }
    {props.message.message!==""?(props.message.message):("")}
    </div>
  <div className={`chat-footer opacity-50 ${theme==="light"?"text-black":"text-white"} font-semibold`}>
  {formttedTime}
  </div>
</div>
  )
}

export default Message
