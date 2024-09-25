import React, { useEffect, useState } from 'react';
import Login from './pages/login.jsx'
import {Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
function App() {
  const {authUser} = useAuthContext();
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
      setLoading(true);
      setTimeout(()=>{
         setLoading(false);
      },1900)
  },[])
  return (
    <div className='sm:h-screen lg:flex items-center lg:justify-center w-full h-full'>
      {loading?
      (
      <div className='flex flex-row h-screen w-screen items-center justify-center'>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
      ):(<Routes>
        <Route path='/login' element={authUser? <Navigate to="/"/>:<Login/>}/>
        <Route path='/signup' element={authUser? <Navigate to="/"/>:<Signup/>}/>
        <Route path='/' element={authUser?<Home/>:<Login/>}/>
        </Routes>)}
        <Toaster/>
    </div>
    
  )
}

export default App
