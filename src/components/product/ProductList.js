import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('api/products');
                setProducts(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mt-3">Product List</h4>
                </div>
                <div className="col-md-6">
                    <h4 className="mt-3 float-end"><Link to="/product-add"> Add Product </Link></h4>
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.stockQuantity}</td>
                        <td>
                            <Link to={`/product-update/${item.id}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
                            <Button className="btn-sm" variant="danger">Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
