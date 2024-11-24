import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ListingCard = ({ listing }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xs bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden flex flex-col mx-auto hover:opacity-90 transition duration-300"
    >
      {/* Image Section */}
      <div className="relative h-40 w-full">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={listing.image}
          alt={listing.title || "Listing image"}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {listing.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-3">
          {listing.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-green-600">
            ₹{listing.price}
          </span>
          <span className="text-xs text-gray-500">
            {listing.country}, {listing.location}
          </span>
        </div>
        <Link
          to={`/listingdetails/${listing._id}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-300"
        >
          View Details
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export default ListingCard;
