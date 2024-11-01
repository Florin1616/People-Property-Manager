// src/pages/SignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Register the user
            const registerResponse = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name, password }),
            });

            const registerData = await registerResponse.text();

            if (registerResponse.ok) {
                console.log('User registered:', registerData);

                // Add the person details to the entities endpoint
                const newPerson = {
                    name,
                    age: parseInt(age),
                    occupation,
                    address,
                    photo
                };

                addPerson(newPerson);

                // Redirect to login page after successful registration
                navigate('/login');
            } else {
                setError(registerData);
                console.error('Registration error:', registerData);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Network or unexpected error:', err);
        }
    };

    const addPerson = (newPerson) => {
        fetch('http://localhost:8080/entities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Person added:', data);
                // Clear form fields after successful submission
                setName('');
                setAge('');
                setOccupation('');
                setAddress('');
                setPhoto('');
                setPassword('');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="signUpContainer">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Age:
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </label>
                <label>
                    Occupation:
                    <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
                </label>
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </label>
                <label>
                    Photo URL:
                    <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default SignUp;