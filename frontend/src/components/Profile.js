import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/global.css'; // Import global styles

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('user_token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/users/api/user-details/', {
                    headers: { 'Authorization': `Token ${token}` },
                });
                setUserData(response.data);
            } catch (error) {
                alert('Error fetching profile data');
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {userData ? (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p className="loading-message">Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;
