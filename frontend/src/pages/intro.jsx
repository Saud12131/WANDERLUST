import React from 'react';
import { motion } from "framer-motion";

export default function Intro() {
    const token = localStorage.getItem('token');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="hello">
                <h1 className="text-4xl font-bold text-blue-600">WELCOME TO WANDERLUST!</h1>
            </div>
            <br />
            <div className="buttons">
                {token ? (
                    <>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <a href="/alllistings">All listings</a>
                        </motion.button>
                        
                    </>
                ) : (
                    <>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <a href="/login">Login</a>
                        </motion.button>
                        &nbsp; &nbsp; &nbsp;
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <a href="/signup">Signup</a>
                        </motion.button>
                        &nbsp;
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <a href="/alllistings">All listings</a>
                        </motion.button>
                        
                    </>
                )}
            </div>
        </div>
    );
}
