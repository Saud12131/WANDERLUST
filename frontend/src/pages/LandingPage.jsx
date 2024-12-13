
import React from 'react'
import { motion } from "framer-motion"

export default function LandingPage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const text = "  Find your perfect getaway with Wanderlust – book homes, villas, and bungalows at your fingertips."
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4">WELCOME TO WANDERLUST!</h1>
       
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl max-w-3xl mx-auto"
        >
         <h1 className="font-bold mb-4">{text.split("").map((el, idx) =>
          <motion.span key={idx}
            initial={{
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)"
            }}
            transition={{
              delay: 0.1 * idx
            }}
          >
            {el}</motion.span>)}</h1>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {token ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/alllistings"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
            >
              All Listings
            </a>
          </motion.div>
        ) : (
          <>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/login"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
              >
                Login
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
              >
                Signup
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/alllistings"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
              >
                All Listings
              </a>
            </motion.div>
          </>
        )}
      </motion.div>

    </div>
  )
}

