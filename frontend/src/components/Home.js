import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const Home = ({ apps }) => {
    const navigate = useNavigate();

    if (!apps) {
        return <p className="loading-text">Loading apps...</p>;
    }

    if (apps.length === 0) {
        return <p className="no-apps-text">No apps available at the moment.</p>;
    }

    return (
        <div className="home-container">
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
            <h2 className="apps-title">Apps Available:</h2>
            <ul className="apps-list">
                {apps.map((app) => (
                    <li key={app.id} className="app-item">
                        <img src={`${app.logo}`} alt={`${app.app_name} logo`} />

                        <div className="app-info">
                            <h3 className="app-name">{app.app_name}</h3>
                            <p className="app-category">{app.category}</p>
                        </div>
                        <button
                            className="details-button"
                            onClick={() => navigate(`/app-details/${app.id}`)}
                        >
                            Details
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default Home;
