import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css'; // Import global styles

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('users/api/admin-login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            navigate('/admin-dashboard'); // Redirect to admin dashboard after successful login
        } else {
            const data = await response.json();
            setError(data.error || 'Login failed');
        }
    };

    return (
        <div className="admin-login-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin} className="admin-login-form">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="admin-login-error">{error}</p>}
        </div>
    );
};

export default AdminLogin;
