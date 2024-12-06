import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home'; // Import the Home component
import '../styles/global.css';

const UserDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (!token) {
            navigate('/user-options');
            return;
        }

        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('/users/api/user-details/', {
                    headers: { Authorization: `Token ${token}` },
                });

                const appsResponse = await axios.get('/users/api/list-apps/', {
                    headers: { Authorization: `Token ${token}` },
                });

                setUserData(userResponse.data);
                setApps(appsResponse.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error('Error fetching user data or apps:', err);
                alert('Error fetching user data or apps.');
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li onClick={() => navigate('/user-dashboard')}>Home</li>
                    <li onClick={() => navigate('/profile')}>Profile</li>
                    <li onClick={() => navigate('/points')}>Points</li>
                    <li onClick={() => navigate('/tasks')}>Tasks</li>
                    <li
                        onClick={() => {
                            localStorage.removeItem('user_token');
                            navigate('/'); // Redirect to role selection page
                        }}
                    >
                        Logout
                    </li>
                </ul>
            </div>
            <div className="main-content">
                <Home apps={apps} />
            </div>
        </div>
    );
};

export default UserDashboard;
