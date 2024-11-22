// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { useLocation } from 'react-router-dom';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function SearchResults() {
    const query = useQuery();
    const title = query.get('title') || ''; 
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/listings/searchlisting?title=${title}`);
                if (response.data.success) {
                    setSearchResults(response.data.listings);
                }
            } catch (err) {
                console.error("Error fetching search results:", err);
                notify(err.message)
            }
        };

        if (title) handleSearch();
    }, [title]);

    return (
        <div>
            <div className="container mx-auto px-6 py-10">
                <Navbar />
                <h1 className="text-3xl font-bold mb-8">Search Results for "{title}"</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {searchResults.length > 0 ? (
                        searchResults.map((listing, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto"
                            >
                                <img src={listing.image} alt="Listing" className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{listing.title}</h2>
                                     <p className="text-gray-600 mb-2">{listing.description}</p> 
                                    <p className="text-gray-800 font-bold mb-1">${listing.price}</p>
                                     <p className="text-sm text-gray-500">{listing.country}, {listing.location}</p> 
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No listings found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
