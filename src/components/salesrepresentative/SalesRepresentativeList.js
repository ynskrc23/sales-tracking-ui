import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const SalesRepresentativeList = () => {
    const [SalesRepresentatives, setSalesRepresentatives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesRepresentatives = async () => {
            try {
                const response = await axios.get('api/salesrepresentatives');
                setSalesRepresentatives(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesRepresentatives();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container">
            <h4 className="mt-3">SalesRepresentative List</h4>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {SalesRepresentatives.map((item, index) => (
                    <tr key={index}>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
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

export default SalesRepresentativeList;