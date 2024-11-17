import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('/api/users');
				setUsers(response.data.detail);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const deleteUser = async (userId) => {
		try {
			await axios.delete(`/api/users/${userId}`);
			setUsers(users.filter(user => user.userId !== userId));
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	const columns = [
		{
			name: 'Name',
			selector: row => row.fullName,
			sortable: true,
		},
		{
			name: 'Email',
			selector: row => row.email,
			sortable: true,
		},
		{
			name: 'Order',
			selector: row => row.userOrder,
			sortable: true,
		},
		{
			name: 'Status',
			selector: row => row.userStatus ? 'Active' : 'Inactive',
			sortable: true,
		},
		{
			name: 'Action',
			cell: row => (
				<div>
					<Link to={`/user/edit/${row.userId}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
					<button onClick={() => deleteUser(row.userId)} className="btn btn-danger btn-sm ml-2">Delete</button>
				</div>
			),
		},
	];

	const filteredUsers = users.filter(user =>
		user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
		user.email.toLowerCase().includes(searchText.toLowerCase())
	);

	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.autoTable({
			head: [['Name', 'Email', 'Order', 'Status']],
			body: filteredUsers.map(user => [
				user.fullName,
				user.email,
				user.userOrder,
				user.userStatus,
			]),
		});
		doc.save('users.pdf');
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="container mt-3">
			<div className="row mb-3 align-items-center">
				<div className="col-md-4">
					<h4>Users</h4>
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
						<CSVLink data={filteredUsers} filename="users.csv" className="btn btn-success me-2">Export CSV</CSVLink>
						<button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
						<Link to="/user/add" className="btn btn-primary">Add User</Link>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={filteredUsers}
				pagination
				responsive
			/>
		</div>
	);
};

export default UserList;