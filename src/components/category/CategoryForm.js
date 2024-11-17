import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
	const [form, setForm] = useState({
		categoryId: null,
		categoryName: '',
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errors, setErrors] = useState({});
	const { categoryId } = useParams(); // URL'den id parametresini alıyoruz
	const navigate = useNavigate();

	useEffect(() => {
		if (categoryId) {
			fetchCategory(categoryId);
		}
	}, [categoryId]);

	const fetchCategory = async (categoryId) => {
		try {
			const response = await axios.get(`/api/categories/${categoryId}`);
			setForm(response.data.detail);
		} catch (error) {
			console.error('Error fetching category:', error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
		setErrors({ ...errors, [name]: '' }); // Hataları temizle
	};

	const validateForm = () => {
		let formErrors = {};
		if (!form.categoryName) formErrors.categoryName = 'Name is required';

		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		const formData = {
			categoryName: form.categoryName,
		};

		try {
			if (categoryId) {
				// Güncelleme işlemi
				await axios.put(`/api/categories/${categoryId}`, formData);
				setSuccessMessage('Category updated successfully');
			} else {
				// Ekleme işlemi
				await axios.post('/api/categories', formData);
				setSuccessMessage('Category added successfully');
			}

			// Mesajı 2 saniye sonra temizleyip yönlendirme yapalım
			setTimeout(() => {
				setSuccessMessage('');
				navigate('/category'); // Ürün listesine yönlendirme
			}, 2000);
		} catch (error) {
			console.error('There was an error saving the Category!', error);
		}
	};

	return (
		<div className="container mt-3">
			<h4 className="mb-3">{categoryId ? 'Edit Category' : 'Add Category'}</h4>
			{successMessage && <div className="alert alert-success">{successMessage}</div>}
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group col-md-4 mb-3">
						<label htmlFor="categoryName" className="mb-1">Name</label>
						<input
							id="name"
							name="categoryName"
							type="text"
							className="form-control"
							value={form.categoryName}
							onChange={handleChange}
							required
						/>
						{errors.categoryName && <div className="text-danger">{errors.categoryName}</div>}
					</div>
				</div>

				<button type="submit" className="btn btn-primary mt-3">
					{categoryId ? 'Update Category' : 'Add Category'}
				</button>
			</form>
		</div>
	);
};

export default CategoryForm;