import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { User, MapPin, List, IndianRupee,  ArrowBigLeftDash,} from 'lucide-react';


export default function UserInfo() {
  const [userInfo, setuserInfo] = useState({});
  const [usersListings, setusersListings] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
       
        const response = await axios.get("http://localhost:3000/api/listings/userdetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setuserInfo(response.data.user);
          setusersListings(response.data.user.listings || []);
        }

      } catch (err) {
        console.error("Error fetching details:", err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchDetails();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white py-6 px-4 sm:px-6 lg:px-8">
      <i><a href="alllistings"> <ArrowBigLeftDash/></a></i>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-sky-500 md:w-48 flex flex-col items-center justify-center p-4">
            <img
              src={
                userInfo.pic ||
                'https://i.pinimg.com/originals/68/0e/24/680e241336ae8d3a57a42f54b656e58f.jpg'
              }
              alt="User profile"
              className="h-24 w-24 rounded-full object-cover border-2 border-white shadow-md"
            />
            <h2 className="mt-2 text-lg font-semibold text-white">{userInfo.username}</h2>
            <p className="mt-1 text-sm text-sky-100">{userInfo.email}</p>
          </div>
          <div className="p-4 w-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-sky-800 mb-2 flex items-center">
                <User className="mr-2 h-5 w-5" /> Your Profile
              </h3>
              <div className="bg-sky-50 p-3 rounded-md shadow-sm">
                <p className="text-sm text-sky-800"><span className="font-semibold">Username:</span> {userInfo.username}</p>
                <p className="text-sm text-sky-800 mt-1"><span className="font-semibold">Email:</span> {userInfo.email}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-sky-800 mb-2 flex items-center">
                <List className="mr-2 h-5 w-5" /> Your Listings
              </h3>
              {usersListings.length > 0 ? (
                <ul className="space-y-3">
                  {usersListings.map((listing, index) => (
                    <li
                      key={index}
                      className="bg-white p-3 rounded-md shadow-sm hover:shadow-md transition duration-300 border border-sky-100"
                    >
                      <h4 className="text-base font-bold text-sky-700 mb-1">{listing.title}</h4>
                      <p className="text-xs text-gray-600 mb-1 flex items-center">
                        <MapPin className="mr-1 h-3 w-3" /> {listing.location || 'Location not specified'}
                      </p>
                      <p className="text-sm text-gray-700 mb-1 line-clamp-2">{listing.description}</p>
                      <p className="text-sm text-sky-600 font-bold flex items-center">
                        <IndianRupee className="mr-1 h-4 w-4" /> {listing.price} INR
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 bg-sky-50 p-2 rounded-md">No listings available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

