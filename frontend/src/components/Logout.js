const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        alert('Logged out successfully!');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
