import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
//import MapPage from './MapPage.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Projects from './Projects.jsx';
import ParcelCreate from './ParcelCreate.jsx';
import { ToastContainer } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import './styles.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="topbar">
          <div className="brand">LandGuard <span className="accent">AI</span></div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/map">Map</Link>
            <Link to="/projects">Marketplace</Link>
            <Link to="/parcel/create">Add Parcel</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/parcel/create" element={<ParcelCreate />} />
          </Routes>
        </main>

        <footer className="footer">© LandGuard AI - Hackathon MVP</footer>
        <ToastContainer position="top-right" />
      </div>
    </BrowserRouter>
  );
}
