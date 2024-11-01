import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.text();

            console.log('Response data:', data); // Debugging line to log the token

            if (response.ok) {
                // Save the token to local storage
                localStorage.setItem('token', data);
                console.log('Token saved to local storage'); // Debugging line to confirm saving

                // Redirect the user to the main page
                navigate('/main');
            } else {
                // Show an error message
                setError(data);
                console.error('Error:', data); // Debugging line to log error messages
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Network or unexpected error:', err); // Debugging line to log network errors
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Log in</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Login;
