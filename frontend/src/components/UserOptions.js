import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const UserOptions = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isSignup ? '/users/api/user-register/' : '/users/api/user-login/';

        if (isSignup && formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user_token', data.token);

            if (isSignup) {
                alert('Account created successfully! Please sign in.');
                navigate('/user-options');
            } else {
                navigate('/user-dashboard');
            }
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Error during authentication. Please try again.');
        }
    };

    return (
        <div className="user-options-container">
            <h2 className="user-options-title">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit} className="user-options-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="user-options-input"
                    required
                />
                {isSignup && (
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="user-options-input"
                        required
                    />
                )}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="user-options-input"
                    required
                />
                {isSignup && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="user-options-input"
                        required
                    />
                )}
                <button type="submit" className="user-options-submit">
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <button
                onClick={() => setIsSignup(!isSignup)}
                className="user-options-toggle"
            >
                {isSignup ? 'Already have an account? Sign In' : 'New user? Sign Up'}
            </button>
        </div>
    );
};

export default UserOptions;
