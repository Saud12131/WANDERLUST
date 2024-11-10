import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function ListingInfo() {
  const [listinginfo, setListingInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const currentUser = JSON.parse(localStorage.getItem("user"));  // Get logged-in user
  const userId = currentUser?.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/listings/listingdetails/${id}`, {
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
        setListingInfo(null);
      }
    };

    if (id) fetchData();
  }, []);

  const handelDelete = async (req, res) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/api/listings/deletelisting/${id}`, {
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
    <div className="bg-blue-50 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl border border-blue-200">
        <h1 className="text-4xl font-semibold text-blue-700 mb-6 text-center">Listing Details</h1>
        {listinginfo ? (
          <>
            <div className="flex justify-center mb-6">
              <img
                src={listinginfo.image}
                alt={listinginfo.title}
                className="w-64 h-64 object-cover rounded-lg border border-blue-300"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-800">{listinginfo.title}</h2>
              <p className="text-lg font-semibold text-blue-600">Price: ${listinginfo.price}</p>
              <p className="text-md text-gray-600">{listinginfo.description}</p>
              <div className="flex flex-col text-blue-700 space-y-2">
                <p><span className="font-medium">Country:</span> {listinginfo.country}</p>
                <p><span className="font-medium">Location:</span> {listinginfo.location}</p>
              </div>
              <div>
                {listinginfo.owner._id === userId && (
                  <button onClick={handelDelete} className="bg-red-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300 m-2">
                    Delete Listing
                  </button>
                )}
                <button className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300 m-2" >BOOK</button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">Loading listing details...</p>
        )
        }
      </div >
      <ToastContainer />
    </div >
  );
}
