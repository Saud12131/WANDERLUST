import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowBigLeft, EyeClosed } from 'lucide-react';
import { Spinner } from '../components/Spinner';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let [loading, setLoading] = useState(false);
  const [passwordVisib, setpasswordVisib] = useState(false);
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const url = import.meta.env.BACKEND_BASE_URLL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`https://wanderlust-backend-ak18.onrender.com/api/user/login`, formData);
      if (response.status === 200) {
        let token = response.data.token;
        localStorage.setItem("token", token);
        notify("Loggedin Successfully");
        navigate("/alllistings");
      }
      setLoading(false);
    } catch (err) {
      notify("Please enter valid details");
      setLoading(false)
    }
  };

  const togelpass = async (e) => {
    e.preventDefault();
    setpasswordVisib(!passwordVisib);
  };

  const credentials = async () => {
    setFormData({
      email: "guest@gmail.com",
      password: "guest"
    });
  };

  return (
    <div className="main-div mt-16 m-5 sm:m-10">
      <i><a href="/"><ArrowBigLeft /></a></i>
      <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Welcome back!</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-300 max-w-md mx-auto">
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
            Enter your Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={passwordVisib ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button onClick={togelpass} type="button" className="p-1 m-1 rounded-sm">
            <EyeClosed className="text-black" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            type="submit"
            disabled={loading}
          >
            <h2 className='flex justify-center items-center'>
              {loading ? <Spinner /> : 'Login'}
            </h2>
          </button>
          <button
            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
            type="button"
            onClick={credentials}
          >
            Guest credentials
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 w-full sm:w-auto text-center" href="/forgot-password">
            Forgot Password?
          </a>
        </div>
      </form>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
        onClick={() => navigate("/signup")}
      >
        Signup
      </button>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}
