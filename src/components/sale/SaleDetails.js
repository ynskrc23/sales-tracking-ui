import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

const SaleDetails = () => {
    const { id } = useParams();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0); // Total amount state

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const response = await axios.get(`/api/sales/number/${id}`);
                setSales(response.data.detail); // Assuming response.data.detail is an array of sales grouped by sale number

                // Calculate total amount
                const total = response.data.detail.reduce((acc, sale) => acc + sale.totalAmount, 0);
                setTotalAmount(total);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleDetails();
    }, [id]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (sales.length === 0) return <p>No sales found for ID {id}</p>;

    // Determine if all sales have the same customer details
    const firstSale = sales[0];
    const sameCustomer = sales.every(sale =>
        sale.customer.firstName === firstSale.customer.firstName &&
        sale.customer.lastName === firstSale.customer.lastName &&
        sale.customer.email === firstSale.customer.email &&
        sale.customer.phone === firstSale.customer.phone &&
        sale.customer.address === firstSale.customer.address &&
        sale.customer.city === firstSale.customer.city &&
        sale.customer.state === firstSale.customer.state &&
        sale.customer.zipCode === firstSale.customer.zipCode &&
        sale.customer.country === firstSale.customer.country
    );

    return (
        <div className="container mt-5">

            <div className="row">
                <div className="col-md-6">
                    <h5 className="mb-0">Sales Details Report</h5>
                </div>
                <div className="col-md-6">
                    <h5 className="float-end">Total Sales Amount: {formatCurrency(totalAmount)}</h5>
                </div>
            </div>
            {sales.map((sale, index) => (
                <div key={index} className="card shadow-sm mb-4">
                    <div className="card-body">
                        {sameCustomer && !index && (
                            <div>
                                <h5 className="section-title mt-2">Customer Details</h5>
                                <p className="card-text">
                                    <strong>Name:</strong> {`${firstSale.customer.firstName} ${firstSale.customer.lastName}`}
                                </p>
                                <p className="card-text"><strong>Email:</strong> {firstSale.customer.email}</p>
                                <p className="card-text"><strong>Phone:</strong> {firstSale.customer.phone}</p>
                                <p className="card-text">
                                    <strong>Address:</strong> {`${firstSale.customer.address}, ${firstSale.customer.city}, ${firstSale.customer.state}, ${firstSale.customer.zipCode}, ${firstSale.customer.country}`}
                                </p>
                            </div>
                        )}

                        <h5 className="section-title mt-2">Details of Sale {index + 1}</h5>
                        <p className="card-text"><strong>Order ID:</strong> {sale.id}</p>
                        <p className="card-text"><strong>Status:</strong> {sale.status}</p>
                        <p className="card-text"><strong>Quantity:</strong> {sale.quantity}</p>
                        <p className="card-text"><strong>Product Sale
                            Price:</strong> {formatCurrency(sale.productSalePrice)}</p>
                        <p className="card-text"><strong>Total Amount:</strong> {formatCurrency(sale.totalAmount)}</p>

                        <h5 className="section-title mt-2">Product Details</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Product Name:</strong> {sale.product.name}</li>
                            <li className="list-group-item"><strong>Description:</strong> {sale.product.description}
                            </li>
                            <li className="list-group-item"><strong>Product
                                Price:</strong> {formatCurrency(sale.product.price)}</li>
                            <li className="list-group-item"><strong>Stock
                                Quantity:</strong> {sale.product.stockQuantity}</li>
                        </ul>
                    </div>
                </div>
            ))}
            <h5>Total Sales Amount: {formatCurrency(totalAmount)}</h5>
        </div>
    );
};

export default SaleDetails;
