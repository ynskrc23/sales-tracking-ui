import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = () => {
	const [form, setForm] = useState({
		customerId: null,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		country: ''
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { customerId } = useParams();

	useEffect(() => {
		if (customerId) {
			fetchCustomer(customerId);
		}
	}, [customerId]);

	const fetchCustomer = async (customerId) => {
		try {
			const response = await axios.get(`/api/customers/${customerId}`);
			setForm(response.data.detail);
		} catch (error) {
			console.error('Error fetching customer:', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setErrors({ ...errors, [name]: '' }); // Temizle hata mesajını
	};

	const validateForm = () => {
		let formErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[0-9]*$/; // Yalnızca rakamları kabul et

		if (!form.firstName) formErrors.firstName = 'First name is required';
		if (!form.lastName) formErrors.lastName = 'Last name is required';
		if (!form.email) {
			formErrors.email = 'Email is required';
		} else if (!emailRegex.test(form.email)) {
			formErrors.email = 'Invalid email format';
		}
		if (!form.phone) {
			formErrors.phone = 'Phone is required';
		} else if (!phoneRegex.test(form.phone)) {
			formErrors.phone = 'Phone must contain only numbers';
		}
		if (!form.address) formErrors.address = 'Address is required';
		if (!form.city) formErrors.city = 'City is required';
		if (!form.country) formErrors.country = 'Country is required';

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0; // Eğer hata yoksa true döner
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const formData = {
			customerId: form.customerId,
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			phone: form.phone,
			address: form.address,
			city: form.city,
			country: form.country
		};

		try {
			if (customerId) {
				// Güncelleme işlemi
				await axios.put(`/api/customers/${customerId}`, formData);
				setSuccessMessage('Customer updated successfully');
			} else {
				// Ekleme işlemi
				await axios.post('/api/customers', formData);
				setSuccessMessage('Customer added successfully');
			}

			// Mesajı 2 saniye sonra temizleyip yönlendirme yapalım
			setTimeout(() => {
				setSuccessMessage('');
				navigate('/customer');
			}, 2000);
		} catch (error) {
			console.error('There was an error saving the customer!', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">{customerId ? 'Update Customer' : 'Add Customer'}</h4>
			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="firstName" className="mb-1">First Name</label>
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={form.firstName}
							onChange={handleChange}
						/>
						{errors.firstName && <div className="text-danger">{errors.firstName}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="lastName" className="mb-1">Last Name</label>
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={form.lastName}
							onChange={handleChange}
						/>
						{errors.lastName && <div className="text-danger">{errors.lastName}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="email" className="mb-1">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={form.email}
							onChange={handleChange}
						/>
						{errors.email && <div className="text-danger">{errors.email}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="phone" className="mb-1">Phone</label>
						<input
							id="phone"
							name="phone"
							type="text"
							className="form-control"
							value={form.phone}
							onChange={handleChange}
						/>
						{errors.phone && <div className="text-danger">{errors.phone}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="address" className="mb-1">Address</label>
						<input
							id="address"
							name="address"
							type="text"
							className="form-control"
							value={form.address}
							onChange={handleChange}
						/>
						{errors.address && <div className="text-danger">{errors.address}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="city" className="mb-1">City</label>
						<input
							id="city"
							name="city"
							type="text"
							className="form-control"
							value={form.city}
							onChange={handleChange}
						/>
						{errors.city && <div className="text-danger">{errors.city}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="country" className="mb-1">Country</label>
						<input
							id="country"
							name="country"
							type="text"
							className="form-control"
							value={form.country}
							onChange={handleChange}
						/>
						{errors.country && <div className="text-danger">{errors.country}</div>}
					</div>
				</div>

				<button type="submit" className="btn btn-primary mt-3">
					{customerId ? 'Update' : 'Add'}
				</button>
			</form>
		</div>
	);
};

export default CustomerForm;