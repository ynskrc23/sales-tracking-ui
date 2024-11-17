// src/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate importu
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate(); // useNavigate hook'u

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	// Logout fonksiyonu
	const logout = () => {
		// Token'ı localStorage'dan sil
		localStorage.removeItem('token');

		// Kullanıcıyı giriş sayfasına yönlendir
		navigate('/');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="/">MyLogo</a>
				<button className="navbar-toggler" type="button" onClick={toggleMenu} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/user">User</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/menu">Menu</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/customer">Customer</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/role">Role</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/product">Product</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/category">Category</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/salesperson">Sales Person</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/sale">Sale</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/invoice">Invoice</Link>
						</li>
						{/* Logout butonu */}
						<li className="nav-item">
							<button className="nav-link btn" onClick={logout}>Logout</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;