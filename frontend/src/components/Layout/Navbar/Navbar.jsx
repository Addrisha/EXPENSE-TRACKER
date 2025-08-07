// components/Layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">💸 ExpenseTracker</div>
            <ul className="navbar-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
                <li><Link to="/auth/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
