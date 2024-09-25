import React from 'react'
import { useContext } from 'react';
import Sidebar from '../components/sidebar'
import MessageContainer from '../components/messagecontainer';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
  const { theme} = useContext(ThemeContext);
  return (
    <div className={`flex flex-row w-full h-screen lg:px-12 lg:py-8 sm:w-screen box-border bg-[url('/bg.jpg')]`}>
<Sidebar/>
<MessageContainer/>
    </div>
  )
}

export default Home