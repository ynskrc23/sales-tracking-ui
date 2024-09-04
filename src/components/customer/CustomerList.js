import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CustomerList = () => {
    const [customers, setcustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchcustomers = async () => {
            try {
                const response = await axios.get('api/customers');
                setcustomers(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchcustomers();
    }, []);

    const deleteCustomer = async (customerId) => {
        try {
            await axios.delete(`/api/customers/${customerId}`);
            setcustomers(customers.filter(customer => customer.customerId !== customerId));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mb-3">Customers</h4>
                </div>
                <div className="col-md-6">
                    <Link to="/customer/add" className="btn btn-primary float-end mb-3">Add Customer</Link>
                </div>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((item) => (
                    <tr key={item.customerId}>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.city}</td>
                        <td>{item.country}</td>
                        <td>
                            <Link to={`/customer/edit/${item.customerId}`}
                                  className="btn btn-sm btn-warning m-lg-1">Edit</Link>
                            <button onClick={() => deleteCustomer(item.customerId)}
                                    className="btn btn-danger btn-sm ml-2">Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;