import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  const url = import.meta.env.BACKEND_BASE_URLL;
  return (
    <div
      className="h-screen w-full flex flex-col justify-center items-center text-center px-4 bg-gray-900">

      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">
        404 - Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/alllistings"
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg"
      >
        Go Back to Listings
      </Link>
    </div>
  );
};

export default NotFound;
