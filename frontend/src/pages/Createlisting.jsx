import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        country: '',
        location: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/listings/createlisting", formData);
            console.log("data sended to api", response);
            if (response.status === 201) {
                notify("Listing created successfully");
                navigate("/alllistings")
            }
        } catch (err) {
            notify("please enter correct feilds ");
            console.log("an error occured", err);
        }

    };
    const notify = (message) => toast(message);
    return (
        <div className="main-div mt-16 m-10">
            <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Let's Signup</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-300">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        enter listing title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="listing title"
                        value={formData.title}
                        onChange={handleChange}
                        autoComplete="title"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Enter price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleChange}
                        autoComplete="price"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                       enter location
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        placeholder="enter location"
                        value={formData.location}
                        onChange={handleChange}
                        autoComplete="location"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                        enter country
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="country"
                        type="text"
                        placeholder="enter country"
                        value={formData.country}
                        onChange={handleChange}
                        autoComplete="enter the country"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        upload image 
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        placeholder="upload image"
                        value={formData.image}
                        onChange={handleChange}
                        autoComplete="image"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Post Listing
                    </button>
                   
                </div>
            </form>
            <div >
                <ToastContainer />
            </div>
        </div>
    );
}

