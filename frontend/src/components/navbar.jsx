// src/components/Navbar.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handelLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handelSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(`http://localhost:3000/api/listings/searchlisting?title=${searchQuery}`);
        //console.log(response);

        if (response.data.success) {
          navigate(`/searchresults?title=${searchQuery}`); // Fixed the URL format here
        }
      } catch (err) {
        console.log("Search failed", err);
      }
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Wanderlust</Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <form onSubmit={handelSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Listings by title"
              className="bg-gray-700 text-white p-2 rounded-md"
            />
            <button type="submit" className="ml-2 text-white bg-blue-500 px-4 py-2 rounded-md">Search</button>
          </form>
          {token ? (
            <>
              <Link to="/newlisting" className="text-white hover:text-gray-300">
                Create new listing
              </Link>
              <Link to="/alllistings" className="text-white hover:text-gray-300">
                All Listings
              </Link>
              <Link to="/alllistings" className="text-white hover:text-gray-300">
                <i className="fa-solid fa-user size-5"></i>
              </Link>
              <button className="text-white hover:text-gray-300" onClick={handelLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
