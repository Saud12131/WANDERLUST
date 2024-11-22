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
                notify(err.message)
                setListings([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container mx-auto px-6 py-10'>
            <Navbar />
            <h1 className="text-3xl font-bold mb-5 mt-10">All Listings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                {listings.length > 0 ? (
                    listings.map((listing, index) => (
                        <div
                            key={index}
                            className="max-w-xs w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
                            <a href="#">
                                <img
                                    className="rounded-t-lg w-full h-48 object-cover"
                                    src={listing.image}
                                    alt="image not available"
                                />
                            </a>
                            <div className="p-5 h-full flex flex-col">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {listing.title}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {listing.description}
                                </p>
                                <p className="text-gray-800 font-bold mb-1">
                                    &#x20b9;{listing.price}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {listing.country}, {listing.location}
                                </p>
                                <a
                                    href={`/listingdetails/${listing._id}`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Details
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No listings available</p>
                )}
            </div>
        </div>
    );
}
