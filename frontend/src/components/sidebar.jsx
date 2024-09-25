import React, { useContext, useState } from 'react'
import SearchInput from './searchInput.jsx';
import Conversations from './Conversations.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSun,faMoon} from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../context/AuthContext.jsx';
import SelfProfile from './SelfProfile.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
import useConversation from '../../zustand/useConversation.jsx';
import useLogout from '../hooks/useLogout.jsx';
function Sidebar() {
  const {logout} = useLogout();
  const {authUser} = useAuthContext();
  const [showProfile,setShowProfile] = useState(false);
  const {hideSideBar,setHideSideBar,setHideProfile} = useConversation();
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <>
    <div className={`${hideSideBar} h-full lg:rounded-xl ${theme==='light'?"bg-white":"bg-slate-700"} lg:min-w-[27%] lg:max-w-[27%] w-full lg:mr-2 overflow-hidden`}>
      <div className='flex flex-row lg:mb-5 md:mb-7 mb-5 bg-[#4f46e5] lg:h-16 h-20 justify-between items-center px-4 sticky top-0 py-6 lg:rounded-t-lg lg:rounded-b-none'>
      <div className="avatar items-center min-w-[30%] max-w-[95%] gap-4">
  <div className="lg:w-12 w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={`${authUser.profilePic===""?'/user.jpg':authUser.profilePic}`} onClick={(e)=>{
      setShowProfile(!showProfile)
      setHideSideBar("lg:flex lg:flex-col hidden")
      setHideProfile("flex flex-col w-[100%]")
    }} className='cursor-pointer'/>
  </div>
  <p className='text-white font-semibold capitalize'>{authUser.fullName}</p>
</div>
<div className='group text-red-800f'>
{<div className="dropdown">
  <div tabIndex={0} role="button" className="">
  <FontAwesomeIcon icon={faGear} className='text-white size-5'/>
  </div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[9999] w-32 p-2 h-24 shadow-md ml-[-6rem] mt-[0.5rem] flex flex-col gap-2">
    <li className='flex flex-row justify-center'>
    <div
          className="w-[90%] h-8 bg-gray-300 dark:bg-gray-600 rounded-xl flex items-center p-1 cursor-pointer transition duration-500"
          onClick={toggleTheme}
        >
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full shadow-md transform transition-transform duration-500 ${
              theme === 'dark' ? 'translate-x-1 bg-black':'translate-x-16 bg-yellow-400'
            }`}
          >
            {theme === 'dark' ? (
              <FontAwesomeIcon icon={faMoon} className="text-white" />
            ) : (
              <FontAwesomeIcon icon={faSun} className="text-white" />
            )}
          </div>
        </div>
    </li>
    <li className='flex flex-row justify-center'>
    <button className='flex rounded-xl items-center justify-center w-[90%] h-8 font-semibold bg-[#4f46e5] text-white hover:bg-[#3b32e8]' onClick={logout}>Logout</button>
    </li>
  </ul>
</div>}
</div>
      </div>
        <SearchInput/>
        <div className='lg:my-2 md:my-4 my-2'/>
        <Conversations/>
        <div className='my-1'/>
    </div>
    {showProfile===true?<SelfProfile />:''}
    </>   )
}

export default Sidebar