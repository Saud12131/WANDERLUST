import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handelLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handelSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/listings/searchlisting?title=${searchQuery}`
        );
        if (response.data.success) {
          navigate(`/searchresults?title=${searchQuery}`);
        }
      } catch (err) {
        console.log("Search failed", err);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">Wanderlust</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <form onSubmit={handelSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
          {token ? (
            <>
              <Link to="/newlisting" className="text-gray-800 hover:text-blue-600">
                Create Listing
              </Link>
              <Link to="/alllistings" className="text-gray-800 hover:text-blue-600">
                All Listings
              </Link>
              <button
                onClick={() => navigate("/userinfo")}
                className="text-gray-800 hover:text-blue-600"
              >
                <i className="fas fa-user"></i>
              </button>
              <button
                onClick={handelLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-800 hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="text-gray-800 hover:text-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="px-4 py-2">
            <form onSubmit={handelSearch} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          </div>
          <div className="px-4 py-2 space-y-2">
            {token ? (
              <>
                <Link
                  to="/newlisting"
                  className="block text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Listing
                </Link>
                <Link
                  to="/alllistings"
                  className="block text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  All Listings
                </Link>
                <button
                  onClick={() => {
                    navigate("/userinfo");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-gray-800 hover:text-blue-600"
                >
                  <i className="fas fa-user"></i> Profile
                </button>
                <button
                  onClick={() => {
                    handelLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-gray-800 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
