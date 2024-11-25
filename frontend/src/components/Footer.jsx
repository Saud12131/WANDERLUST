import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-3 mt-16 border-b border-slate-300 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and Description */}
          <div>
            <h2 className="text-2xl font-bold">Wanderlust</h2>
            <p className="mt-2 text-sm text-gray-200">
              Discover beautiful places and book the perfect stay. Explore villas, houses, flats, and bungalows for rent.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="hover:text-sky-400">Support</Link>
              </li>
             
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <ul className="mt-4 flex space-x-6">
              <li>
                <a href="https://github.com/Saud12131" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400">
                <i className="fa-brands fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/_saud_syd_?t=9-tbMyFWqS0EVi17ROQ_YA&s=09" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
             
              <li>
                <a href="https://www.linkedin.com/in/sayyed-saud-a6128129b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-400">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2024 Wanderlust. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
