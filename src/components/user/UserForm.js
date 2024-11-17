import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
	const [form, setForm] = useState({
		userId: null,
		fullName: '',
		email: '',
		password: '', // Şifre alanı eklendi
		userOrder: '',
		userStatus: '',
		roleId: ''
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { userId } = useParams();
	const [roles, setRoles] = useState([]); // Kategori listesi

	useEffect(() => {
		if (userId) {
			fetchUser(userId);
		}
		fetchRoles();
	}, [userId]);

	const fetchUser = async (userId) => {
		try {
			const response = await axios.get(`/api/users/${userId}`);
			const userData = response.data;
			setForm({
				userId: userData.userId,
				fullName: userData.fullName,
				email: userData.email,
				password: '', // Şifreyi boş bırakabilirsiniz
				userOrder: userData.userOrder,
				userStatus: userData.userStatus,
				roleId: userData.role?.roleId || '' // `role` nesnesinden `roleId` alınır
			});
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const fetchRoles = async () => {
		try {
			const response = await axios.get('/api/roles'); // Örnek bir endpoint
			setRoles(response.data);
		} catch (error) {
			console.error('Error fetching roles:', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setErrors({ ...errors, [name]: '' }); // Hata mesajını temizle
	};

	const validateForm = () => {
		let formErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!form.fullName) formErrors.fullName = 'Full name is required';
		if (!form.email) {
			formErrors.email = 'Email is required';
		} else if (!emailRegex.test(form.email)) {
			formErrors.email = 'Invalid email format';
		}
		if (!form.password && !userId) {
			// Şifre kontrolü, yalnızca yeni kullanıcı eklerken zorunlu
			formErrors.password = 'Password is required';
		}
		if (!form.roleId) formErrors.roleId = 'Role is required';

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const formData = {
			userId: form.userId,
			fullName: form.fullName,
			email: form.email,
			password: form.password, // Şifreyi gönderiyoruz
			userOrder: form.userOrder,
			userStatus: form.userStatus,
			roleId: form.roleId
		};

		try {
			if (userId) {
				await axios.put(`/api/users/${userId}`, formData);
				setSuccessMessage('User updated successfully');
			} else {
				await axios.post('/api/users', formData);
				setSuccessMessage('User added successfully');
			}

			setTimeout(() => {
				setSuccessMessage('');
				navigate('/user');
			}, 2000);
		} catch (error) {
			console.error('There was an error saving the user!', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">{userId ? 'Update User' : 'Add User'}</h4>
			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="fullName" className="mb-1">Full Name</label>
						<input
							id="fullName"
							name="fullName"
							type="text"
							className="form-control"
							value={form.fullName}
							onChange={handleChange}
						/>
						{errors.fullName && <div className="text-danger">{errors.fullName}</div>}
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
						<label htmlFor="password" className="mb-1">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={form.password}
							onChange={handleChange}
							placeholder={userId ? 'Leave blank to keep current password' : ''}
						/>
						{errors.password && <div className="text-danger">{errors.password}</div>}
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="userOrder" className="mb-1">User Order</label>
						<input
							id="userOrder"
							name="userOrder"
							type="text"
							className="form-control"
							value={form.userOrder}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="userStatus" className="mb-1">User Status</label>
						<select
							id="userStatus"
							name="userStatus"
							className="form-control"
							value={form.userStatus}
							onChange={handleChange}
						>
							<option value={true}>Active</option>
							<option value={false}>Inactive</option>
						</select>
					</div>
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="roleId" className="mb-1">User Role</label>
						<select
							id="roleId"
							name="roleId"
							className="form-control"
							value={form.roleId || ''} // Gelen değer yoksa boş string atanır
							onChange={handleChange}
						>
							<option value="">Select a role</option>
							{roles.map((role) => (
								<option key={role.roleId} value={role.roleId}>
									{role.roleName}
								</option>
							))}
						</select>
						{errors.roleId && <div className="text-danger">{errors.roleId}</div>}
					</div>
				</div>
				<button type="submit" className="btn btn-primary mt-3">
					{userId ? 'Update' : 'Add'}
				</button>
			</form>
		</div>
	);
};

export default UserForm;