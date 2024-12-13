import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ListingCard from '../components/ListingCards';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import ScrollableFilters from '../components/Filters';
export default function AllListings() {
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();
    const notify = (message) => toast(message);
    const url = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem('token');
                let response = await axios.get(`${url}/listings/alllistings`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success && Array.isArray(response.data.listing)) {
                    setListings(response.data.listing);
                } else {
                    console.log("Unexpected data format", response.data);
                    notify("Unexpected data format received");
                }
                
            } catch (err) {
                console.log("An error occurred:", err);
                notify(err.message);
                setListings([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen ">
            <Navbar />
            <div className="container mx-auto px-4 py-16 ">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-white text-center mb-12"
                    >
                    Explore All Listings
                    <ScrollableFilters/>
                </motion.h1>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {listings.length > 0 ? (
                        listings.map((listing) => (
                            <ListingCard key={listing._id} listing={listing} />
                        ))
                    ) : (
                        <p className="text-white text-center col-span-full text-xl">
                            No listings available at the moment. Check back soon!
                        </p>
                    )}
                </motion.div>
            </div>
            <ToastContainer />
           <Footer/>
        </div>
    );
}
