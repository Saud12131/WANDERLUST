import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    let [task, settask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const Logout = async () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/task/alltask", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data.tasks);

                settask(response.data.tasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                if (err.response && err.response.status === 401) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [navigate]);

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
            {task.length === 0 ? (<p>no task available lets add a task</p>) : (
                <ul className='space-y-4'>
                    {task.map((alltask) => (
                        <li key={alltask._id}
                            className={`p-4 border rounded-md ${alltask.isDone ? 'bg-green-100' : 'bg-white'}`}>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium">{alltask.newTask}</span>
                                <span className={`text-sm ${task.isDone ? 'text-green-500' : 'text-gray-500'}`}>
                                    {task.isDone ? "Completed" : "Pending"}
                                </span>
                                <span>
                                    <button className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    onClick={()=>{alltask.isDone = true}}
                                    >Done</button>
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="logout">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={Logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
