import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuForm = () => {
	const [form, setForm] = useState({
		menuName: '',
		menuIcon: '',
		menuOrder: '',
		menuStatus: true,
		menuType: 0,
		menuParentId: 0,
		menuVisible: true,
		create: false,
		update: false,
		list: false
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
		setErrors({ ...errors, [name]: '' }); // Clear the error message
	};

	const validateForm = () => {
		let formErrors = {};
		const menuNameRegex = /^[A-Za-z0-9\s]+$/; // Allow letters, numbers, and spaces

		if (!form.menuName) formErrors.menuName = 'Menu name is required';
		if (!menuNameRegex.test(form.menuName)) formErrors.menuName = 'Invalid menu name';
		if (!form.menuOrder) formErrors.menuOrder = 'Menu order is required';
		if (isNaN(form.menuOrder)) formErrors.menuOrder = 'Menu order must be a number';

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0; // Return true if no errors
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const formData = {
			menuName: form.menuName,
			menuIcon: form.menuIcon,
			menuOrder: form.menuOrder,
			menuStatus: form.menuStatus,
			menuType: form.menuType,
			menuParentId: form.menuParentId,
			menuVisible: form.menuVisible
		};

		try {
			// Add menu with additional boolean parameters
			await axios.post('/api/menus', formData, {
				params: {
					create: form.create,
					update: form.update,
					list: form.list
				}
			});
			setSuccessMessage('Menu added successfully');

			// Clear message after 2 seconds and navigate
			setTimeout(() => {
				setSuccessMessage('');
				navigate('/menu'); // Uncomment this to redirect after success
			}, 2000);
		} catch (error) {
			console.error('There was an error saving the menu!', error);
		}
	};


	return (
		<div className="container mt-3">
			<h4 className="mb-3">Add Menu</h4>
			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="menuName" className="mb-1">Menu Name</label>
						<input
							id="menuName"
							name="menuName"
							type="text"
							className="form-control"
							value={form.menuName}
							onChange={handleChange}
						/>
						{errors.menuName && <div className="text-danger">{errors.menuName}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="menuIcon" className="mb-1">Menu Icon</label>
						<input
							id="menuIcon"
							name="menuIcon"
							type="text"
							className="form-control"
							value={form.menuIcon}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="menuOrder" className="mb-1">Menu Order</label>
						<input
							id="menuOrder"
							name="menuOrder"
							type="text"
							className="form-control"
							value={form.menuOrder}
							onChange={handleChange}
						/>
						{errors.menuOrder && <div className="text-danger">{errors.menuOrder}</div>}
					</div>
					<div className="col-md-4 mb-3">
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="create"
								name="create"
								checked={form.create}
								onChange={handleChange}
							/>
							<label className="form-check-label" htmlFor="create">Create</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="update"
								name="update"
								checked={form.update}
								onChange={handleChange}
							/>
							<label className="form-check-label" htmlFor="update">Update</label>
						</div>
						<div className="form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="list"
								name="list"
								checked={form.list}
								onChange={handleChange}
							/>
							<label className="form-check-label" htmlFor="list">List</label>
						</div>
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="menuStatus" className="mb-1">Menu Status</label>
						<select
							id="menuStatus"
							name="menuStatus"
							className="form-control"
							value={form.menuStatus}
							onChange={handleChange}
						>
							<option value={true}>Active</option>
							<option value={false}>Inactive</option>
						</select>
					</div>
					{/* Remove menuType field */}
				</div>
				<button type="submit" className="btn btn-primary mt-3">
					Add
				</button>
			</form>
		</div>
	);
};

export default MenuForm;