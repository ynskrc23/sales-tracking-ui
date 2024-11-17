import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [fullName, setFullName] = useState(null);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('fullName');
		navigate('/');
	};

	useEffect(() => {
		const storedFullName = localStorage.getItem('fullName');
		if (storedFullName) {
			setFullName(storedFullName);
		}
	}, []);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="/">MyLogo</a>
				<button
					className="navbar-toggler"
					type="button"
					onClick={toggleMenu}
					aria-controls="navbarNav"
					aria-expanded={isOpen}
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/dashboard">Home</Link>
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
					</ul>
					<div className="dropdown">
						{fullName && (
							<button
								className="btn btn-light dropdown-toggle"
								type="button"
								id="userDropdown"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{fullName}
							</button>
						)}
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
							<li>
								<button className="dropdown-item" onClick={logout}>Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
