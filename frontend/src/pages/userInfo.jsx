import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const [userInfo, setuserInfo] = useState({});
  const [usersListings, setusersListings] = useState([]);
  const [UserBookings, setUserBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/listings/userdetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setuserInfo(response.data.user);
          setusersListings(response.data.user.listings || []);
        }

        const bookingsResponse = await axios.get("http://localhost:3000/api/bookings/mybookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const bookingDetails = bookingsResponse.data.BookingDetails;
        setUserBookings(bookingDetails || []);
      } catch (err) {
        console.error("Error fetching details:", err);
        notify(err.message)
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchDetails();
  }, [navigate]);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <div className="bg-zinc-400 p-8 rounded-lg shadow-lg w-full max-w-6xl">

        <div className="flex flex-col items-center mb-6">
          <img
            src={
              userInfo.pic ||
              'https://i.pinimg.com/originals/68/0e/24/680e241336ae8d3a57a42f54b656e58f.jpg'
            }
            alt="User profile"
            className="h-24 w-24 rounded-full object-cover"
          />
          <h2 className="text-2xl font-semibold mt-4">{userInfo.username}</h2>
          <p className="text-gray-600">{userInfo.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Listings Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Your Listings</h3>
            {usersListings.length > 0 ? (
              <ul className="space-y-4">
                {usersListings.map((listing, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
                  >
                    <h4 className="text-lg font-bold">{listing.title}</h4>
                    <p className="text-gray-700">{listing.description}</p>
                    <p className="text-gray-900 font-bold mt-2">{listing.price} USD</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No listings available</p>
            )}
          </div>

          {/* My Bookings Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
            {UserBookings.length > 0 ? (
              <ul className="space-y-4">
                {UserBookings.map((booking, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md"
                  >
                    <h4 className="text-lg font-bold">{booking.listing.title}</h4>
                    <span className="font-semibold">Check-in:</span>{" "}
                    {new Date(booking.checkInDate).toLocaleDateString("en-us", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    <br />
                    <span className="font-semibold">Check-Out:</span>{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString("en-us", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    <h3 className='font-semibold text-lime-400'>Booking Confirmed</h3>

                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No bookings available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}