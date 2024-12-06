import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        if (role === 'admin') {
            navigate('/admin-login');
        } else {
            navigate('/user-options');
        }
    };

    return (
        <div className="role-selection-container">
            <h1 className="role-selection-title">Select Your Role</h1>
            <button
                onClick={() => handleRoleSelect('admin')}
                className="role-selection-button"
            >
                Admin Login
            </button>
            <button
                onClick={() => handleRoleSelect('user')}
                className="role-selection-button"
            >
                User (Register/Login)
            </button>
        </div>
    );
};

export default RoleSelection;
