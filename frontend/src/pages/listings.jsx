import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
export default function AllListings() {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('token');
                let response = await axios.get("http://localhost:3000/api/listings/alllistings", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success && Array.isArray(response.data.listing)) {
                    setListings(response.data.listing);
                } else {
                    console.log("Unexpected data format", response.data);
                }
            } catch (err) {
                console.log("An error occurred:", err);
                setListings([]);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div className='container mx-auto px-6 py-10'>
            <Navbar/>
            <h1 className="text-3xl font-bold mb-8">All Listings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {listings.length > 0 ? (
                    listings.map((listing, index) => (
                        <div 
                            key={index} 
                            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto"  >
                            <img src={listing.image} alt="image not available" className='w-full h-32 object-fit'/>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{listing.title}</h2>
                                <p className="text-gray-600 mb-2">{listing.description}</p>
                                <p className="text-gray-800 font-bold mb-1">${listing.price}</p>
                                <p className="text-sm text-gray-500">{listing.country}, {listing.location}</p>
                            </div>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300 m-2" onClick={()=>{navigate(`/listingdetails/${listing._id}`)}}>DETAILS</button>
                        </div>
                    ))
                ) : (
                    <p>No listings available</p>
                )}
            </div>
        </div>
    );
}
