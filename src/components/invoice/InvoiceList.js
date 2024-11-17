import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('api/invoices');
                setInvoices(response.data.detail);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
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
            <h4 className="mt-3">Invoice List</h4>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Payment Made</th>
                    <th>Amount Due</th>
                    <th>Invoice Date</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map((item, index) => (
                    <tr key={index}>
                        <td>{item.sale.customer.firstName} {item.sale.customer.lastName}</td>
                        <td>{item.sale.customer.email}</td>
                        <td>{item.sale.customer.phone}</td>
                        <td>{item.sale.customer.country}</td>
                        <td>{item.sale.product.name}</td>
                        <td>{formatCurrency(item.sale.product.price)}</td>
                        <td>{formatCurrency(item.sale.totalAmount)}</td>
                        <td>{formatCurrency(item.amountDue)}</td>
                        <td>{item.invoiceDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
