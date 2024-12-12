import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [fullName, setFullName] = useState(null);
	const [filteredMenus, setFilteredMenus] = useState([]);
	const navigate = useNavigate();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('fullName');
		localStorage.removeItem('permission');
		navigate('/');
	};

	useEffect(() => {
		const fetchMenus = async () => {
			try {
				const storedFullName = localStorage.getItem('fullName');
				if (storedFullName) setFullName(storedFullName);

				const storedPermissions = localStorage.getItem('permission');
				const permissions = storedPermissions.split('*').map((item) => JSON.parse(item));
				const { data: apiResponse } = await axios.get('/api/menus');
				const apiMenus = Array.isArray(apiResponse.detail) ? apiResponse.detail : [];
				const filtered = apiMenus.filter((menu) => {
					// Eğer `menuParentId === 0` ise her zaman eklenir (root menü).
					if (menu.menuParentId === 0) return true;

					// `menuParentId` baz alınarak izinler kontrol ediliyor.
					const permission = permissions.find((p) => p.menu_id === menu.menuParentId);

					// Eğer ilgili `menuParentId` için izin bulunamazsa filtre dışı bırakılır.
					if (!permission) return false;

					// `menuType` ve izin kontrolleri.
					if (menu.menuType === 1 && permission.permission_show) return true;
					if (menu.menuType === 2 && permission.permission_add) return true;
					if (menu.menuType === 3 && permission.permission_update) return true;

					return false; // Hiçbir koşul sağlanmazsa menü eklenmez.
				});

				setFilteredMenus(filtered);
			} catch (error) {
				console.error('Error fetching menus:', error);
			}
		};

		fetchMenus();
	}, []);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="/home">MyLogo</a>
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
						{/* Parent ve Child Menüler */}
						{filteredMenus
							// menuOrder'a göre sıralama
							.sort((a, b) => a.menuOrder - b.menuOrder)
							.reduce((acc, menu) => {
								// "menuType === 3" olanları dışlamak
								if (menu.menuType === 3) {
									return acc;
								}

								if (menu.menuParentId === 0) {
									// Parent menüleri ekle
									const childMenus = filteredMenus.filter((child) => child.menuParentId === menu.menuId);

									if (childMenus.length > 0) {
										// Child menüleri olan Parent menüler dropdown olarak gösteriliyor
										acc.push(
											<li key={menu.menuId} className="nav-item dropdown">
												<a
													className="nav-link dropdown-toggle"
													href="#"
													id={`dropdown-${menu.menuId}`}
													role="button"
													data-bs-toggle="dropdown"
													aria-expanded="false"
												>
													{menu.menuName}
												</a>
												<ul className="dropdown-menu" aria-labelledby={`dropdown-${menu.menuId}`}>
													{childMenus.map((childMenu) => {
														// "menuType === 3" olan child menüleri dışlamak
														if (childMenu.menuType === 3) {
															return null;
														}
														return (
															<li key={childMenu.menuId}>
																<Link className="dropdown-item" to={childMenu.menuUrl}>
																	{childMenu.menuName}
																</Link>
															</li>
														);
													})}
												</ul>
											</li>
										);
									} else {
										// Child menüsü olmayan Parent menüler doğrudan ekleniyor
										acc.push(
											<li key={menu.menuId} className="nav-item">
												<Link className="nav-link" to={menu.menuUrl}>
													{menu.menuName}
												</Link>
											</li>
										);
									}
								}
								return acc;
							}, [])
						}
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
								<button className="dropdown-item" onClick={logout}>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);


};

export default Navbar;