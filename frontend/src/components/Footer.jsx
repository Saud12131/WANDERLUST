import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-100 text-white py-3 mt-8 border-b border-slate-300 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Logo and Description */}
          <div> 
            <h2 className="text-xl font-bold text-black">Wanderlust</h2>
            <p className="mt-2 text-xs text-black">
              Discover beautiful places and book the perfect stay. Explore villas, houses, flats, and bungalows for rent.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-base font-semibold text-black ">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="hover:text-sky-400 text-black">Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-base font-semibold text-black">Follow Us</h3>
            <ul className="mt-4 flex space-x-4">
              <li>
                <a href="https://github.com/Saud12131" target="_blank" rel="noopener noreferrer" className="text-black hover:text-sky-400">
                  <i className="fa-brands fa-github"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/_saud_syd_?t=9-tbMyFWqS0EVi17ROQ_YA&s=09" target="_blank" rel="noopener noreferrer" className="text-black hover:text-sky-400">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sayyed-saud-a6128129b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-black hover:text-sky-400">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs text-black">
          <p>&copy; 2024 Wanderlust. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );

};

export default Footer;
