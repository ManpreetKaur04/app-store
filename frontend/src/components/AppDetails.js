import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/global.css';

const AppDetails = () => {
    const { appId } = useParams();
    const [appDetails, setAppDetails] = useState(null);
    const [proofImage, setProofImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppDetails = async () => {
            try {
                const token = localStorage.getItem('user_token');
                const response = await axios.get(`/users/api/app-details/${appId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setAppDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching app details.');
                setLoading(false);
            }
        };

        fetchAppDetails();
    }, [appId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('proof_image', proofImage);

        const token = localStorage.getItem('user_token');
        try {
            const response = await axios.post(`/users/api/upload-proof/${appId}/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Proof uploaded successfully, points added!');
                navigate('/tasks');
            }
        } catch (err) {
            alert('Error uploading proof.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <p className="loading-text">Loading...</p>;
    }

    if (error) {
        return <p className="error-text">{error}</p>;
    }

    return (
        <div className="app-details-container">
            <h1 className="app-details-title">{appDetails.app_name} Details</h1>

            {/* Display App Logo */}
            {appDetails.logo && (
                <div className="app-logo">
                    <img
                        src={appDetails.logo}
                        alt={`${appDetails.app_name} logo`}
                        className="app-logo-image"
                    />
                </div>
            )}

            <div className="app-details-info">
                <p><strong>Category:</strong> {appDetails.category}</p>
                <p><strong>Description:</strong> {appDetails.description}</p>
                <p><strong>Points:</strong> {appDetails.points}</p>
            </div>

            <h2 className="upload-title">Upload Proof</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="file-upload">
                    <input
                        type="file"
                        onChange={(e) => setProofImage(e.target.files[0])}
                        required
                        className="file-input"
                    />
                </div>
                <button
                    type="submit"
                    className={`submit-button ${isSubmitting && 'disabled-button'}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Uploading...' : 'Upload Proof'}
                </button>
            </form>
        </div>
    );
};

export default AppDetails;
