import React, { useState } from 'react'
import useLogin from '../hooks/useLogin';
function Login() {
  const [inputs,setInputs] = useState({
    'mail':'',
    'password':''
  });
  const {loading,login} = useLogin();
 const handleSubmit = async (e)=>{
  e.preventDefault();
  await login(inputs);
 }
  return (
    <>
    {loading?("Loading..."):(
      <div className="bg-[url('/bg.jpg')] flex flex-col justify-center mx-auto align-center w-full items-center h-screen">
      <div className='p-6 rounded-lg shadow-md bg-clip-padding w-80 md:w-70 border-2 border-white'>
          <h1 className='text-4xl font-semibold text-center text-white pb-2'>Login 
          </h1>
          <form onSubmit={handleSubmit}>
             <label className='label p-2 pt-3' htmlFor="">
                  <span className='text-base label-text text-white font-bold'>Email</span>
              </label>
              <input type='mail' placeholder='Enter email' className='bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={inputs.mail} 
              onChange={(e)=>setInputs({...inputs,mail:e.target.value})}/>
              <label className='label p-2 pt-3' htmlFor="">
                  <span className='text-base label-text text-white font-bold'>Password</span>
              </label>
              <input type='password' placeholder='Enter Password' className='bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={inputs.password} 
              onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
              <a href="/signup" className='p-2 pt-3 text-sm hover:underline hover:text-white mt-2 inline-block text-gray-200 font-medium'>Don't have any account yet?</a>
              <div>
                <button type='submit' href="#_" className="relative inline-flex items-center justify-center p-2 px-4 py-2 overflow-hidden font-medium text-red-900 transition duration-300 ease-out border-2 border-gray-200 rounded-full shadow-md group">
<span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="absolute flex items-center justify-center w-full h-full text-black bg-white transition-all duration-300 transform group-hover:translate-x-full ease font-medium">Enter</span>
<span className="relative invisible">Login</span>
</button>
              </div>
          </form>
      </div>
  </div>
    )}
    </>
  )
}

export default Login