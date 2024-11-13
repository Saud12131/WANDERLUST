import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  let [userInfo, setuserInfo] = useState({});
  let [usersListings, setusersListings] = useState([]);
let navigate  = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/listings/userdetails", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setuserInfo(response.data.user);
          setusersListings(response.data.user.listings);
        }
      } catch (err) {
        console.log(`something broke: ${err}`);
        navigate("/login")
      }
    };

    fetchDetails();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <div className="flex justify-center mb-4">
        <img 
          src={userInfo.pic || 'https://i.pinimg.com/originals/68/0e/24/680e241336ae8d3a57a42f54b656e58f.jpg'} 
          alt="User profile" 
          className="h-24 w-24 rounded-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-2">User Info</h2>
      <h3 className="text-lg text-center mb-4">{userInfo.username}</h3>
      <p className="text-center text-gray-600 mb-4">{userInfo.email}</p>

      {usersListings.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-xl font-semibold">Your Listings:</h4>
          <ul className="space-y-4 mt-4">
            {usersListings.map((listing, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md border-solid border-2 border-sky-500">
                <h5 className="text-lg font-semibold">{listing.title}</h5>
                <p className="text-gray-700">{listing.description}</p>
                <p className="text-gray-900 font-bold mt-2">{listing.price} USD</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No listings available</p>
      )}
    </div>
  </div>
);
}
