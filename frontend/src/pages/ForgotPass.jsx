
import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowBigLeft } from 'lucide-react';
export default function ForgotPass() {
  const [email, setemail] = useState('');
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const url = import.meta.env.BACKEND_BASE_URLL;
  const handleChange = (e) => {
    setemail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log("button clicked", email);
    try {
      const response = await axios.post(`https://wanderlust-backend-ak18.onrender.com/api/user/forgot-password`, {email});
      if(response.data.success){
        notify("Email sended successfully");
      }
      console.log(response);
  
    } catch (err) {
      console.log(err);

    }

  };



  return (
    <div className="main-div mt-16 m-10">
      <i><a href="/login"><ArrowBigLeft /></a></i>
      <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Lets recover password!</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-300">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Enter your Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>

        </div>
      </form>
      <div >
        <ToastContainer />
      </div>
    </div>
  );
}
