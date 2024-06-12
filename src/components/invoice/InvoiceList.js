import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const InvoiceList = () => {
    const [Invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('api/invoices');
                setInvoices(response.data);
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
                    <th>Total Amount</th>
                    <th>Invoice Date </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {Invoices.map((item, index) => (
                    <tr key={index}>
                        <td>{item.sale.customer.firstName} {item.sale.customer.lastName}</td>
                        <td>{item.sale.customer.email}</td>
                        <td>{item.sale.customer.phone}</td>
                        <td>{item.sale.customer.country}</td>
                        <td>{item.sale.product.name}</td>
                        <td>{item.sale.product.price}</td>
                        <td>{item.amount}</td>
                        <td>{item.invoiceDate}</td>
                        <td>
                            <Button className="btn-sm" variant="warning">Edit</Button>{' '}
                            <Button className="btn-sm" variant="danger">Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;