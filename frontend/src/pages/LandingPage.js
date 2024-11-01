// src/pages/LandingPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to People&Property Manager</h1>
            <button onClick={() => navigate('/login')}>Log In</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
}

export default LandingPage;
