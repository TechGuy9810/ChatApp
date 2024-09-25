import React, { useState } from 'react'
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';
function Signup() {
    const [inputs,setInputs] = useState({
        'fullName':'',
        'mail':'',
        'password':'',
        'confirmPassword':'',
        'gender':''
    });
    const {signup} = useSignup();
    const handleSubmit = async (e)=>{
        e.preventDefault();
    const sucess = handleInputErrors(inputs.fullName,inputs.mail,inputs.password,inputs.confirmPassword,inputs.gender);
    if(!sucess) return;
        await signup(inputs);
    };
    const handleCheckBox = (e)=>{
    setInputs({...inputs,gender:e})
    };
  return (
    <div className={`flex flex-col justify-center mx-auto align-center w-full items-center h-screen bg-[url('/bg.jpg')]`}>
        <form onSubmit={handleSubmit}>
        <div className={`p-6 rounded-lg shadow-md bg-clip-padding w-80 md:w-70 border-2 border-white`}>
            <h1 className='text-4xl font-semibold text-center text-white pb-2'>Create Account 
            </h1>
                <label className='label p-2 ' htmlFor="">
                    <span className='text-base label-text text-white font-medium'>Name</span>
                </label>
                <input type="text"  placeholder='Enter Name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={inputs.fullName} 
                onChange={(e)=>setInputs({...inputs,fullName:e.target.value})}
                />
                <label className='label p-2' htmlFor="">
                    <span className='text-base label-text text-white font-medium'>Email</span>
                </label>
                <input type='email' placeholder='Enter Email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={inputs.mail} 
                                onChange={(e)=>setInputs({...inputs,mail:e.target.value})}
                />
                <label className='label p-2' htmlFor="">
                    <span className='text-base label-text text-white font-medium'>Password</span>
                </label>
                <input type='password' placeholder='Enter password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={inputs.password} 
                                onChange={(e)=>setInputs({...inputs,password:e.target.value})}
                />
                <label className='label p-2' htmlFor="">
                    <span className='text-base label-text text-white font-medium'>Confirm Password</span>
                </label>
                <input type='password' placeholder='Enter Confirm Password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={inputs.confirmPassword} 
                                onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
                />
                <div className='flex'>
                <div className='form-control'>
                    <label className={`label gap-2 cursor-pointer mb-2 mt-2 ${inputs.gender==="male"?"selected":""}`}>
                        <span className='label-text text-gray-200 font-medium'>Male</span>
                        <input type='checkbox' className='checkbox border-gray-200 border-2'
                                        checked={inputs.gender==='male'}
                                        onChange={()=>handleCheckBox("male")}
                        />
                    </label>
                </div>
                <div className='form-control'>
                    <label className={`label gap-2 cursor-pointer mb-2 mt-2 ${inputs.gender==="female"?"selected":""}`}>
                        <span className='label-text text-gray-200 font-medium'>Female</span>
                        <input type='checkbox' className='checkbox border-gray-200 border-2'
                               checked={inputs.gender==="female"}
                                onChange={()=>handleCheckBox("female")}
                        />
                    </label>
                </div>
                
                </div>
                <button type='submit' className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
<span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
<span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
<span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Create Account</span>
<span className="absolute inset-0 border-2 border-white rounded-full"></span>
</button>
                <a href="/login" className='p-2 pt-3 text-sm hover:underline hover:text-white mt-2 inline-block text-gray-200 font-medium'>Already have an account Login</a>
        </div>
</form>
    </div>
  )
}

export default Signup;

function handleInputErrors(fullName,mail,password,confirmPassword,gender)
{
  if(!fullName|| !mail || !password || !confirmPassword || !gender)
  {
    toast.error('Please fill all the fields');
    return false;
  }
  if(password!=confirmPassword)
  {
    toast.error('Passwords do not match');
    return false;
  }
  if(password.length<3)
  {
    
    toast.error('password must be at least 3 characters');
    return false;
  }
  return true;
}