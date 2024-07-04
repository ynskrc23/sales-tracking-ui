import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductUpdate = () => {
    const { id } = useParams(); // URL'den müşteri ID'sini almak için useParams hook'u kullanılır

    const [Product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // id parametresi değiştiğinde useEffect'in yeniden çalışması sağlanır

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...Product, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`/api/products/${id}`, Product);
            alert('Product updated successfully');
            // İsteği başarıyla gönderdikten sonra istemciyi yeniden yönlendirebilirsiniz veya başka bir işlem yapabilirsiniz.
        } catch (error) {
            console.error('There was an error updating the Product!', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { name, description, price, stockQuantity} = Product;

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Update Product</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="name" className="mb-1">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="price" className="mb-1">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="price"
                            className="form-control"
                            value={price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="stockQuantity" className="mb-1">Stock Quantity</label>
                        <input
                            id="stockQuantity"
                            name="stockQuantity"
                            type="text"
                            className="form-control"
                            value={stockQuantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-12 mb-3">
                        <label htmlFor="description" className="mb-1">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Update
                </button>
            </form>
        </div>
    );
};

export default ProductUpdate;
