
import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ArrowBigLeft } from 'lucide-react';
export default function ResetPassword() {
    const url = process.env.REACT_APP_API_BASE_URL;
    const [password, setpassword] = useState('');
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    const { id, token } = useParams();

    const handleChange = (e) => {
        setpassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/user/reset-password/${id}/${token}`, { password });
            if (response.data.success) {
                notify("password updated successfully");
                navigate("/login");
            }
          

        } catch (err) {
            console.log(err);

        }

    };



    return (
        <div className="main-div mt-16 m-10">
            <i><a href="/login"><ArrowBigLeft /></a></i>
            <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Enter new  password!</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-300">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Create new password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Create your password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="password"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update
                    </button>

                </div>
            </form>
            <div >
                <ToastContainer />
            </div>
        </div>
    );
}
