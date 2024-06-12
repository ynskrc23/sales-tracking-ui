// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/product">Product List</Link></li>
                <li><Link to="/customer">Customer List</Link></li>
                <li><Link to="/sale">Sale List</Link></li>
                <li><Link to="/invoice">Invoice List</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
