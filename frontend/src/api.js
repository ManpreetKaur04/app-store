import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/users/', // Replace with your backend URL
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('register')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const registerUser = (data) => 
    axios.post('http://127.0.0.1:8000/users/register/', data); // Use plain axios, no token
export const loginUser = (data) => API.post('token/', data);
export const refreshToken = (data) => API.post('token/refresh/', data);
