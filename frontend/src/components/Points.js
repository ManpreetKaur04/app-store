import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/global.css'; // Import global styles

const Points = () => {
    const [points, setPoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const token = localStorage.getItem('user_token');
                if (!token) {
                    setError('User not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/users/api/user-points/', {
                    headers: { Authorization: `Token ${token}` },
                });

                setPoints(response.data.points || 0); // Ensure `points` is a valid number
            } catch (err) {
                console.error('Error fetching points data:', err);
                setError('Failed to fetch points. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, []);

    if (loading) {
        return <p className="points-container">Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="points-container">
            <h1>Your Points</h1>
            <p>Total Points: <span className="font-semibold">{points}</span></p>
        </div>
    );
};

export default Points;
