import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/user/login", formData);
      console.log("logged in ", response);
      if (response.status === 200) {
        let token  = response.data.token;
        localStorage.setItem("token",token);
        notify("Loggedin Successfully");
        navigate("/alllistings");
      }
    } catch (err) {
      console.log("unable to login ", err.message);
      notify("Please enter valid details");
    }
  };

  const notify = (message) => toast(message);
  return (
    <div className="main-div mt-16 m-10">
      <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Welcome back!</h2>
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
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            enter your  Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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
