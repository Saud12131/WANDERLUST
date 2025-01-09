import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft, EyeClosed } from 'lucide-react';
import { Spinner } from '../components/Spinner';
export default function Signup() {
  const url = import.meta.env.BACKEND_BASE_URLL;
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
   let [loading, setLoading] = useState(false);
  const [passwordVisib, setpasswordVisib] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const notify = (message) => toast(message);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`https://wanderlust-backend-ak18.onrender.com/api/user/signup`, formData);
     // console.log("data sended to api", response);
      if (response.status === 201) {
        notify("Account created successfully");
        navigate("/login")
      }
      setLoading(false);
    } catch (err) {
      notify("please enter correct feilds or email already exist");
      console.log("an error occured", err);
      setLoading(false);
      notify(err.message)
    }
  };
  const togelpass = async (e) => {
    e.preventDefault();
    setpasswordVisib(!passwordVisib);
  }
  return (
    <div className="main-div mt-16 m-10">
      <i><a href="/"><ArrowBigLeft /></a></i>
      <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Let's Signup</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-300" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Create a Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Enter your Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Create a Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type={passwordVisib ? 'text' : 'password'}
            id="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"

          />
          <button onClick={togelpass}
          type='button'
            className='p-1 m-1 rounded-sm ' >
            <EyeClosed className='text-black'/>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onSubmit={handleSubmit}
            disabled={loading}
                    >
                      <h2 className='flex justify-center items-center'>
                        {loading ? <Spinner /> : 'Signup'}
                      </h2>
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="notfound">
            Forgot Password?
          </a>
        </div>
      </form>
      <div >
        <ToastContainer />
      </div>
    </div>
  );
}
