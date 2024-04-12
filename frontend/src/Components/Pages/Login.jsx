import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';


export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    sessionStorage.clear();             
}, []);

  const navigation = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const response = await axios.post('http://localhost:8081/users/login', formData);
        
        const msg = response.data.message
        if(msg === 'Login successful')
        {
          toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce, // Use Bounce transition
          });

          sessionStorage.setItem('username', formData.username);

          navigation('/');
        }        
    } catch (error) {
      const errmsg = error.response.data.message;
      toast.warn(errmsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
};



  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg fill="none" viewBox="0 0 24 24" className="w-12 h-12 text-blue-500" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">
          Sign in into your account
        </h2>
        <span className="text-sm">or <Link to='/register' className="text-blue-500">
          register a new account
        </Link>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='username'>username</label>
              <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' id='username' name='username' value={formData.username} onChange={handleChange} required />
            </div>
            <div className="w-full md:w-full px-3 mb-6 relative">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor='password'>Password</label>
              <input className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none pr-10" type={showPassword ? 'text' : 'password'} id='password' name='password' value={formData.password} onChange={handleChange} required />
              <button type="button" className="absolute inset-y-0 right-0 flex items-center justify-center px-2 text-gray-500" onClick={togglePasswordVisibility}>
                {showPassword ? (                  
                  <AiFillEye className="w-6 h-6 mt-5 mr-3"/>
                ) : (
                  <AiFillEyeInvisible className="w-6 h-6 mt-5 mr-3"/>
                )}
              </button>
            </div>
            <div className="w-full md:w-full px-3">
              <button type='submit' className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Sign in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
