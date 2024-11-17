import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get('/api/categories');
				setCategories(response.data.detail);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const deleteCategory = async (categoryId) => {
		if (!window.confirm('Are you sure you want to delete this category?')) return;
		try {
			await axios.delete(`/api/categories/${categoryId}`);
			setCategories(categories.filter(category => category.categoryId !== categoryId));
		} catch (error) {
			console.error('Error deleting category:', error);
			alert('There was an error deleting the category.');
		}
	};

	const columns = [
		{
			name: 'Name',
			selector: row => row.categoryName,
			sortable: true,
		},
		{
			name: 'Action',
			cell: row => (
				<div>
					<Link to={`/category/edit/${row.categoryId}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
					<button onClick={() => deleteCategory(row.categoryId)} className="btn btn-danger btn-sm">Delete</button>
				</div>
			),
		},
	];

	const filteredCategories = categories.filter(category =>
		category.categoryName.toLowerCase().includes(searchText.toLowerCase())
	);

	const exportToPDF = () => {
		const doc = new jsPDF();
		doc.autoTable({
			head: [['Name']],
			body: filteredCategories.map(category => [
				category.categoryName,
			]),
		});
		doc.save('categories.pdf');
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="container mt-3">
			<div className="row mb-3 align-items-center">
				<div className="col-md-4">
					<h4>Categories</h4>
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
						<CSVLink data={filteredCategories} filename="categories.csv" className="btn btn-success me-2">Export CSV</CSVLink>
						<button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
						<Link to="/category/add" className="btn btn-primary">Add Category</Link>
					</div>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={filteredCategories}
				pagination
				highlightOnHover
				responsive
				striped
				noHeader
			/>
		</div>
	);
};

export default CategoryList;