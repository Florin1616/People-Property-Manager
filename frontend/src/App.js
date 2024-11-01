import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/SignUpPage';
import Details from './pages/details';
import LandingPage from './pages/LandingPage';
import { PeopleProvider } from './components/PeopleContext';
import { PropertiesProvider } from './components/PropertiesContext';

function App() {
  return (
    <PeopleProvider>
      <PropertiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/person/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </PropertiesProvider>
    </PeopleProvider>
  );
}

export default App;
