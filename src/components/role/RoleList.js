import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RoleList = () => {
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await axios.get('/api/roles');
				setRoles(response.data.detail);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchRoles();
	}, []);

	const deleteRole = async (roleId) => {
		try {
			await axios.delete(`/api/roles/${roleId}`);
			setRoles(roles.filter(role => role.roleId !== roleId));
		} catch (error) {
			console.error('Error deleting role:', error);
		}
	};

	const columns = [
		{
			name: 'Role Name',
			selector: row => row.roleName,
			sortable: true,
		},
		{
			name: 'Status',
			selector: row => row.roleStatus === '1' ? 'Active' : 'Inactive',
			sortable: true,
		},
		{
			name: 'Action',
			cell: row => (
				<div>
					<Link to={`/role/edit/${row.roleId}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
					<button onClick={() => deleteRole(row.roleId)} className="btn btn-danger btn-sm ml-2">Delete</button>
				</div>
			),
		},
	];

	const filteredRoles = roles.filter(role =>
		role.roleName.toLowerCase().includes(searchText.toLowerCase()) ||
		(role.roleStatus === '1' ? 'Active' : 'Inactive').toLowerCase().includes(searchText.toLowerCase())
	);

	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.autoTable({
			head: [['Role Name', 'Status']],
			body: filteredRoles.map(role => [
				role.roleName,
				role.roleStatus === '1' ? 'Active' : 'Inactive',
			]),
		});
		doc.save('roles.pdf');
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="container mt-3">
			<div className="row mb-3 align-items-center">
				<div className="col-md-4">
					<h4>Roles</h4>
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
						<CSVLink data={filteredRoles} filename="roles.csv" className="btn btn-success me-2">Export CSV</CSVLink>
						<button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
						<Link to="/role/add" className="btn btn-primary">Add Role</Link>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={filteredRoles}
				pagination
				responsive
			/>
		</div>
	);
};

export default RoleList;