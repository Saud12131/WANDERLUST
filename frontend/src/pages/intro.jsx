import React from 'react';
export default function Intro() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="hello">
                <h1 className="text-4xl font-bold text-blue-600">WELCOME TO WANDERLUST!</h1>
            </div>
            <br />
            <div className="buttons">
                <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <a href="/login">Login</a>
                </button>
                &nbsp; &nbsp; &nbsp;
                <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <a href="/signup">Signup</a>
                </button>
            </div>
           
        </div>
    );
}
