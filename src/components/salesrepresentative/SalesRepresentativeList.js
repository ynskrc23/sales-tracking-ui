import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";

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
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mt-3">Sales Representative List</h4>
                </div>
                <div className="col-md-6">
                    <h4 className="mt-3 float-end"><Link to="/salesrepresentative-add"> Add Sales Representative </Link></h4>
                </div>
            </div>
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
                            <Link to={`/salesrepresentative-update/${item.id}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
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