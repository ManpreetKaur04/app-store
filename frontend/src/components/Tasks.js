import '../styles/global.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [proofImage, setProofImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('user_token');
                const response = await axios.get('/users/tasks/completed/', {
                    headers: { Authorization: `Token ${token}` },
                });
                console.log('Fetched tasks:', response.data);  // Log the data
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
    
        fetchTasks();
    }, []);

    const handleImageChange = (e, taskId) => {
        const file = e.target.files[0];
        setProofImage({ file, taskId });
    };

    const handleUploadProof = async (taskId) => {
        if (!proofImage || proofImage.taskId !== taskId) {
            setUploadError('Please select a valid proof image.');
            return;
        }

        setIsSubmitting(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append('proof_image', proofImage.file);

        const token = localStorage.getItem('user_token');
        try {
            const response = await axios.post(`/users/api/upload-proof/${taskId}/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Proof uploaded successfully, points added!');
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId
                            ? { ...task, status: 'completed', proof_image: response.data.proof_image }
                            : task
                    )
                );
            }
        } catch (err) {
            setUploadError('Error uploading proof. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1>Your Tasks</h1>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <h3>{task.app.app_name}</h3>
                            <p>Status: <span>{task.status}</span></p>
    
                            {task.status === 'pending' ? (
                                <div>
                                    <input type="file" onChange={(e) => handleImageChange(e, task.id)} />
                                    <button
                                        onClick={() => handleUploadProof(task.id)}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Uploading...' : 'Upload Proof'}
                                    </button>
                                    {uploadError && <p className="text-red-500">{uploadError}</p>}
                                </div>
                            ) : (
                                <div>
                                    <p>Proof Uploaded:</p>
                                    <img src={task.proof_image} alt="Proof" />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
    
};

export default Tasks;
