import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data.detail);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`/api/products/${productId}`);
            setProducts(products.filter(product => product.productId !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('There was an error deleting the product.');
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Category', 'Description', 'Price', 'Stock Quantity']],
            body: filteredProducts.map(product => [
                product.productName,
                product.category?.categoryName || 'N/A',
                product.description,
                formatCurrency(product.price),
                product.stockQuantity,
            ]),
        });
        doc.save('products.pdf');
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.productName,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category?.categoryName || 'N/A',
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => formatCurrency(row.price),
            sortable: true,
        },
        {
            name: 'Stock Quantity',
            selector: row => row.stockQuantity,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div>
                    <Link to={`/product/edit/${row.productId}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
                    <button onClick={() => deleteProduct(row.productId)} className="btn btn-danger btn-sm">Delete</button>
                </div>
            ),
        },
    ];

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category?.categoryName?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.price.toString().includes(searchText) ||
        product.stockQuantity.toString().includes(searchText)
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-3">
            <div className="row mb-3 align-items-center">
                <div className="col-md-4">
                    <h4>Products</h4>
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
                        <CSVLink data={filteredProducts} filename="products.csv" className="btn btn-success me-2">Export CSV</CSVLink>
                        <button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
                        <Link to="/product/add" className="btn btn-primary">Add Product</Link>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredProducts}
                pagination
                highlightOnHover
                responsive
                striped
                noHeader
            />
        </div>
    );
};

export default ProductList;