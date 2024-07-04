import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mt-3">Customer List</h4>
                </div>
                <div className="col-md-6">
                    <h4 className="mt-3 float-end"><Link to="/customer-add"> Add Customer </Link></h4>
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
                    <th>ZipCode</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((item) => (
                    <tr key={item.id}>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.city}</td>
                        <td>{item.state}</td>
                        <td>{item.zipCode}</td>
                        <td>{item.country}</td>
                        <td>
                            <Link to={`/customer-update/${item.id}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
                            <Button className="btn-sm" variant="danger">Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;