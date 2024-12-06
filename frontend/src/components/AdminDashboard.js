import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const AdminDashboard = () => {
    const [apps, setApps] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        app_name: '',
        app_link: '',
        category: '',
        subcategory: '',
        points: '',
        logo: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch('users/api/list-apps/')
            .then((response) => response.json())
            .then((data) => setApps(data))
            .catch((error) => console.error('Error fetching apps:', error));
    }, []);

    const handleLogout = () => {
        fetch('users/api/logout/', {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem('authToken');
                    navigate('/');
                } else {
                    alert('Failed to logout. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error during logout:', error);
            });
    };

    const [preview, setPreview] = useState(null);

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'logo' && files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, logo: file }));
            setPreview(URL.createObjectURL(file)); // Set image preview
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) form.append(key, formData[key]);
        });

        const response = await fetch('users/api/add-app/', {
            method: 'POST',
            body: form,
        });

        if (response.ok) {
            const newApp = await response.json();
            setApps([...apps, newApp]);
            setShowForm(false);
            alert('App added successfully!');
        } else {
            alert('Failed to add app.');
        }
    };

    return (
        <div className="admin-dashboard">
            <nav>
                <button onClick={() => setShowForm(false)}>Home</button>
                <button onClick={() => setShowForm(true)}>Add App</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="main-content">
                {showForm ? (
                    <div className="container">
                        <form onSubmit={handleFormSubmit} className='add_app_form'>
                            <input
                                type="text"
                                name="app_name"
                                placeholder="App Name"
                                value={formData.app_name}
                                onChange={handleFormChange}
                                required
                            />
                            <input
                                type="url"
                                name="app_link"
                                placeholder="App Link"
                                value={formData.app_link}
                                onChange={handleFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="category"
                                placeholder="Category"
                                value={formData.category}
                                onChange={handleFormChange}
                                required
                            />
                            <input
                                type="text"
                                name="subcategory"
                                placeholder="Subcategory"
                                value={formData.subcategory}
                                onChange={handleFormChange}
                            />
                            <input
                                type="number"
                                name="points"
                                placeholder="Points"
                                value={formData.points}
                                onChange={handleFormChange}
                                required
                            />
                            <input
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleFormChange}
                            />
                            <button type="submit">Add App</button>
                        </form>
                    </div>
                ) : (
                    <div className="container app-list">
                        <h2>List of Apps</h2>
                        <ul>
                            {apps.map((app) => (
                                <li key={app.id}>
                                    <img
                                        src={`${app.logo}`}
                                        alt={`${app.app_name} logo`}
                                        className="app-logo-image"
                                    />

                                    <div>
                                        <p><strong>Name:</strong> {app.app_name}</p>
                                        <p><strong>Category:</strong> {app.category} - {app.subcategory}</p>
                                        <p><strong>Points:</strong> {app.points}</p>
                                        <a href={app.app_link} target="_blank" rel="noopener noreferrer">Visit App</a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                )}
            </div>
        </div>
    );
                            }
export default AdminDashboard;