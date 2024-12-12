import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [form, setForm] = useState({ email: '', password: '' });
	const [errors, setErrors] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	// Formdaki her input değeri değiştiğinde tetiklenir
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setErrors({ ...errors, [name]: '' }); // Hataları temizle
	};

	// Form doğrulaması
	const validateForm = () => {
		const formErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!form.email) {
			formErrors.email = 'Email is required';
		} else if (!emailRegex.test(form.email)) {
			formErrors.email = 'Invalid email format';
		}

		if (!form.password) {
			formErrors.password = 'Password is required';
		}

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	// Giriş işlemini yapar
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			// Backend'e login isteği gönderiyoruz
			const response = await axios.post('/api/auth/login', form);
			console.log(response);
			// Token'ı localStorage'a kaydediyoruz
			const token = response.data.detail.token;
			const fullName = response.data.detail.fullName;
			const permission = response.data.detail.role.rolePermission;
			localStorage.setItem('token', token); // Token'ı tarayıcıya kaydet
			localStorage.setItem('fullName', fullName); // Kullanıcı adı ve soyadı kaydet
			localStorage.setItem('permission', permission); // Kullanıcı permission kaydet

			// Kullanıcıyı dashboard'a yönlendiriyoruz
			navigate('/dashboard');
		} catch (error) {
			// Hata mesajını set ediyoruz
			setErrorMessage(
				error.response?.data?.message || 'Login failed. Please try again.'
			);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-4">
					<h3 className="text-center mb-4">Login</h3>

					{/* Hata mesajı varsa göster */}
					{errorMessage && (
						<div className="alert alert-danger">{errorMessage}</div>
					)}

					{/* Giriş formu */}
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								className={`form-control ${errors.email ? 'is-invalid' : ''}`}
								value={form.email}
								onChange={handleChange}
							/>
							{errors.email && (
								<div className="invalid-feedback">{errors.email}</div>
							)}
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label>
							<input
								id="password"
								name="password"
								type="password"
								className={`form-control ${errors.password ? 'is-invalid' : ''}`}
								value={form.password}
								onChange={handleChange}
							/>
							{errors.password && (
								<div className="invalid-feedback">{errors.password}</div>
							)}
						</div>
						<button type="submit" className="btn btn-primary w-100">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;