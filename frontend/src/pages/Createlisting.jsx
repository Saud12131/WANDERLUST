import React, { useState } from 'react';
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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const PostDetails = async (file) => {
        if (!file) {
            notify("Please select an image.");
            return;
        }

        setLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "wanderlust");
        data.append("cloud_name", "ddx49nwif");

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/ddx49nwif/image/upload",
                data
            );
            // Update the formData with the secure URL of the uploaded image
            setFormData((prev) => ({
                ...prev,
                image: response.data.secure_url
            }));
            setLoading(false);
            // console.log("Image uploaded successfully:", response.data.secure_url); // Log the URL
        } catch (error) {
            notify("Image upload failed.");
            notify(error.message)
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      //  console.log("Submitting formData:", formData);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:3000/api/listings/createlisting",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );
           // console.log(formData);
            if (response.status === 201) {
                notify("Listing created successfully");
                navigate("/alllistings");
            }
        } catch (err) {
            notify("Please enter correct fields");
            notify(err.message)
        }
    };


    return (
        <div className="main-div mt-16 m-10">
            <h2 className="text-gray-1500 text-xl font-bold text-center mb-4">Create Listing</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-blue-300">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Enter listing title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Listing title"
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Enter description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        autoComplete="description"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Enter location
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={handleChange}
                        autoComplete="location"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                        Enter country
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="country"
                        type="text"
                        placeholder="Enter country"
                        value={formData.country}
                        onChange={handleChange}
                        autoComplete="country"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Upload image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        onChange={(e) => PostDetails(e.target.files[0])}
                        autoComplete="image"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Uploading...' : 'Post Listing'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
