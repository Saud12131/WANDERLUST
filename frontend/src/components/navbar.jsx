import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const url = import.meta.env.BACKEND_BASE_URL;

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const response = await fetch(
          `${url}/listings/searchlisting?title=${searchQuery}`
        );
        if (response.ok) {
          navigate(`/searchresults?title=${searchQuery}`);
        }
      } catch (err) {
        console.log("Search failed", err);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-300 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >

            <Link to="/" className="text-2xl font-bold text-blue-500">
              <i className="fa-solid fa-route mr-4"></i>
            </Link>
            <Link to="/" className="text-2xl font-bold text-blue-500">
              Wanderlust
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search listings..."
                  className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md transition duration-300 hover:bg-sky-500"
                >
                  Search
                </button>
              </form>
              {token ? (
                <>
                  <NavLink to="/newlisting" className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                    Create Listing
                  </NavLink>
                  <NavLink to="/mybookings" className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                    My bookings
                  </NavLink>
                  <NavLink to="/userinfo" className="text-blue-500 hover:bg-sky-500">
                    <i className="fas fa-user text-blue-500"></i>
                  </NavLink>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                    Login
                  </NavLink>
                  <NavLink to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-600"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <form onSubmit={handleSearch} className="flex items-center mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-500 w-full"
            />
            <button
              type="submit"
              className="bg-teal-700 text-white px-4 py-2 rounded-r-md transition duration-300 hover:bg-teal-800"
            >
              Search
            </button>
          </form>
          {token ? (
            <>
              <MobileNavLink to="/newlisting" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                Create Listing
              </MobileNavLink>
              <MobileNavLink to="/mybookings" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                My bookings
              </MobileNavLink>
              <MobileNavLink to="/userinfo" onClick={() => setIsMobileMenuOpen(false)} className="text-teal-600 bg-blue-500 text-white  hover:bg-sky-500">
                <i className="fas fa-user mr-2"></i> Profile
              </MobileNavLink>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-white bg-red-500 transition duration-300 hover:bg-red-600"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                Login
              </MobileNavLink>
              <MobileNavLink to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-sky-500">
                Sign Up
              </MobileNavLink>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

const NavLink = ({ to, children, className }) => (
  <Link to={to} className={`${className} text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 hover:bg-sky-500`}>
    {children}
  </Link>
);

const MobileNavLink = ({ to, onClick, children, className }) => (
  <Link to={to} onClick={onClick} className={`${className} block px-3 py-2 rounded-md text-white transition duration-300 hover:bg-sky-500`}>
    {children}
  </Link>
);

export default Navbar;
