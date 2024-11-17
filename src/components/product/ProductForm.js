import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const [form, setForm] = useState({
        productId: null,
        productName: '',
        description: '',
        price: '',
        stockQuantity: '',
        categoryId: '', // Category ID için yeni bir alan ekleniyor
    });
    const [categories, setCategories] = useState([]); // Kategori listesi
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories(); // Kategorileri önce yükleyelim
            if (productId) {
                await fetchProduct(productId); // Ardından ürünü yükleyelim
            }
        };

        fetchData();
    }, [productId]);

    const fetchProduct = async (productId) => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            const productData = response.data.detail;
            setForm({
                productId: productData.productId,
                productName: productData.productName,
                description: productData.description,
                price: productData.price,
                stockQuantity: productData.stockQuantity,
                categoryId: productData.category.categoryId, // Kategori ID'sini ayarlıyoruz
            });
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data.detail);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!form.productName) formErrors.productName = 'Name is required';
        if (!form.price) formErrors.price = 'Price is required';
        if (!form.stockQuantity) formErrors.stockQuantity = 'Stock quantity is required';
        if (!form.description) formErrors.description = 'Description is required';
        if (!form.categoryId) formErrors.categoryId = 'Category is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = {
            productName: form.productName,
            description: form.description,
            price: form.price,
            stockQuantity: form.stockQuantity,
            categoryId: form.categoryId , // Kategori ID'sini category nesnesi içinde gönderiyoruz
        };

        try {
            if (productId) {
                await axios.put(`/api/products/${productId}`, formData);
                setSuccessMessage('Product updated successfully');
            } else {
                await axios.post('/api/products', formData);
                setSuccessMessage('Product added successfully');
            }

            setTimeout(() => {
                setSuccessMessage('');
                navigate('/product');
            }, 2000);
        } catch (error) {
            console.error('There was an error saving the Product!', error);
        }
    };

    return (
        <div className="container mt-3">
            <h4 className="mb-3">{productId ? 'Edit Product' : 'Add Product'}</h4>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="productName" className="mb-1">Name</label>
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            className="form-control"
                            value={form.productName}
                            onChange={handleChange}
                            required
                        />
                        {errors.productName && <div className="text-danger">{errors.productName}</div>}
                    </div>

                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="price" className="mb-1">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="text"
                            className="form-control"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                        {errors.price && <div className="text-danger">{errors.price}</div>}
                    </div>

                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="stockQuantity" className="mb-1">Stock Quantity</label>
                        <input
                            id="stockQuantity"
                            name="stockQuantity"
                            type="text"
                            className="form-control"
                            value={form.stockQuantity}
                            onChange={handleChange}
                            required
                        />
                        {errors.stockQuantity && <div className="text-danger">{errors.stockQuantity}</div>}
                    </div>

                    <div className="form-group col-md-12 mb-3">
                        <label htmlFor="description" className="mb-1">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            className="form-control"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                        {errors.description && <div className="text-danger">{errors.description}</div>}
                    </div>

                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="categoryId" className="mb-1">Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            className="form-control"
                            value={form.categoryId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && <div className="text-danger">{errors.categoryId}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    {productId ? 'Update Product' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;