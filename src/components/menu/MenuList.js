import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MenuList = () => {
	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchMenus = async () => {
			try {
				const response = await axios.get('/api/menus');
				setMenus(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchMenus();
	}, []);

	const deleteMenu = async (menuId) => {
		try {
			await axios.delete(`/api/menus/${menuId}`);
			setMenus(menus.filter(menu => menu.menuId !== menuId));
		} catch (error) {
			console.error('Error deleting menu:', error);
		}
	};

	const columns = [
		{
			name: 'Menu Name',
			selector: row => row.menuName,
			sortable: true,
		},
		{
			name: 'Menu Icon',
			selector: row => row.menuIcon,
			sortable: true,
		},
		{
			name: 'Menu Order',
			selector: row => row.menuOrder,
			sortable: true,
		},
		{
			name: 'Status',
			selector: row => row.menuStatus ? 'Active' : 'Inactive',
			sortable: true,
		},
		{
			name: 'Actions',
			cell: row => (
				<div>
					<button onClick={() => deleteMenu(row.menuId)} className="btn btn-danger btn-sm ml-2">Delete</button>
				</div>
			),
		},
	];

	const filteredMenus = menus.filter(menu =>
		menu.menuName.toLowerCase().includes(searchText.toLowerCase()) ||
		(menu.menuStatus ? 'Active' : 'Inactive').toLowerCase().includes(searchText.toLowerCase())
	);

	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.autoTable({
			head: [['Menu Name', 'Menu Icon', 'Menu Order', 'Status']],
			body: filteredMenus.map(menu => [
				menu.menuName,
				menu.menuIcon,
				menu.menuOrder,
				menu.menuStatus ? 'Active' : 'Inactive',
			]),
		});
		doc.save('menus.pdf');
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="container mt-3">
			<div className="row mb-3 align-items-center">
				<div className="col-md-4">
					<h4>Menus</h4>
				</div>
				<div className="col-md-8 text-end">
					<div className="d-inline-flex align-items-center">
						<input
							type="text"
							placeholder="Search..."
							value={searchText}
							onChange={e => setSearchText(e.target.value)}
							className="form-control me-2"
							style={{ width: '300px' }}
						/>
						<CSVLink data={filteredMenus} filename="menus.csv" className="btn btn-success me-2">Export CSV</CSVLink>
						<button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
						<Link to="/menu/add" className="btn btn-primary">Add Menu</Link>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={filteredMenus}
				pagination
				responsive
			/>
		</div>
	);
};

export default MenuList;