import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelction.js';
import AdminLogin from './components/AdminLogin';
import UserOptions from './components/UserOptions';
import AdminDashboard from './components/AdminDashboard.js';
import UserDashboard from './components/UserDashboard.js';
import Home from './components/Home.js';
import Points from './components/Points.js';
import Profile from './components/Profile.js';
import Tasks from './components/Tasks.js';
import AppDetails from './components/AppDetails.js';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />;

                <Route path="/user-options" element={<UserOptions />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />;
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/points" element={<Points />} />
                <Route path="/tasks" element={<Tasks />} />

                <Route path="/app-details/:appId" element={<AppDetails />} />

            </Routes>
        </Router>
    );
};

export default App;
