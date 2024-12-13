import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import { Home, MapPin, IndianRupee, User, Trash2, Book, ArrowBigLeftDash } from 'lucide-react';

export default function ListingInfo() {
  const [listinginfo, setListingInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;
  const url = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${url}/listings/listingdetails/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.listingdetails) {
          setListingInfo(response.data.listingdetails);
        } else {
          console.log("Unexpected data format", response.data);
        }
      } catch (err) {
        console.log("An error occurred:", err);
        notify(err.message)
        setListingInfo(null);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handelDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${url}/listings/deletelisting/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        navigate("/alllistings");
      }
    } catch (err) {
      notify(err.message);
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-2xl border border-indigo-200">
      <i><a href="/alllistings"><ArrowBigLeftDash/></a></i>
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Listing Details</h1>
        {listinginfo ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src={listinginfo.image}
                alt={listinginfo.title}
                className="w-48 h-48 object-cover rounded-2xl border-2 border-indigo-300 shadow-md"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-indigo-800 flex items-center">
                <Home className="mr-2 text-indigo-600" /> {listinginfo.title}
              </h2>
              <div className="flex items-center text-indigo-600 text-lg">
                <User className="mr-2" />
                <span className="font-semibold">Owner:</span>
                <span className="ml-2">{listinginfo.owner.username}</span>
              </div>
              <p className="text-xl font-semibold text-purple-600 flex items-center">
                <IndianRupee className="mr-2" /> {listinginfo.price}
              </p>
              <p className="text-md text-gray-700 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                {listinginfo.description}
              </p>
              <div className="flex flex-col text-indigo-700 space-y-2 bg-purple-50 p-4 rounded-xl border border-purple-200">
                <p className="flex items-center">
                  <MapPin className="mr-2 text-purple-600" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{listinginfo.location}, {listinginfo.country}</span>
                </p>
              </div>
              <div className="flex justify-between items-center mt-6">
                {listinginfo.owner._id === userId && (
                  <button
                    onClick={handelDelete}
                    className="bg-pink-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-pink-600 transition duration-300 flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Listing
                  </button>
                )}
                <button 
                  className="bg-indigo-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-indigo-600 transition duration-300 flex items-center"
                  onClick={() => navigate(`/booklisting/${id}`)}
                >
                  <Book className="mr-2 h-4 w-4" /> Book Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

