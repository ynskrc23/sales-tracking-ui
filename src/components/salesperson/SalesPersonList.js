import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalesPersonList = () => {
	const [salespersons, setSalesPersons] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchSalesPersons = async () => {
			try {
				const response = await axios.get('/api/salespersons');
				setSalesPersons(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchSalesPersons();
	}, []);

	const deleteSalesPerson = async (salespersonId) => {
		try {
			await axios.delete(`/api/salespersons/${salespersonId}`);
			setSalesPersons(salespersons.filter(salesperson => salesperson.salespersonId !== salespersonId));
		} catch (error) {
			console.error('Error deleting salesperson:', error);
		}
	};

	const columns = [
		{
			name: 'Name',
			selector: row => `${row.firstName} ${row.lastName}`,
			sortable: true,
		},
		{
			name: 'Email',
			selector: row => row.email,
			sortable: true,
		},
		{
			name: 'Phone',
			selector: row => row.phone,
			sortable: true,
		},
		{
			name: 'Hire Date',
			selector: row => row.hireDate,
			sortable: true,
		},
		{
			name: 'Action',
			cell: row => (
				<div>
					<Link to={`/salesperson/edit/${row.salespersonId}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
					<button onClick={() => deleteSalesPerson(row.salespersonId)} className="btn btn-danger btn-sm ml-2">Delete</button>
				</div>
			),
		},
	];

	const filteredSalesPersons = salespersons.filter(salesperson =>
		`${salesperson.firstName} ${salesperson.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
		salesperson.email.toLowerCase().includes(searchText.toLowerCase()) ||
		salesperson.phone.toLowerCase().includes(searchText.toLowerCase()) ||
		salesperson.hireDate.toLowerCase().includes(searchText.toLowerCase())
	);

	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.autoTable({
			head: [['Name', 'Email', 'Phone', 'Hire Date']],
			body: filteredSalesPersons.map(salesperson => [
				`${salesperson.firstName} ${salesperson.lastName}`,
				salesperson.email,
				salesperson.phone,
				salesperson.hireDate
			]),
		});
		doc.save('salespersons.pdf');
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="container mt-3">
			<div className="row mb-3 align-items-center">
				<div className="col-md-4">
					<h4>SalesPersons</h4>
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
						<CSVLink data={filteredSalesPersons} filename="salespersons.csv" className="btn btn-success me-2">Export CSV</CSVLink>
						<button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
						<Link to="/salesperson/add" className="btn btn-primary">Add Sales Person</Link>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={filteredSalesPersons}
				pagination
				responsive
			/>
		</div>
	);
};

export default SalesPersonList;