import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers');
                setCustomers(response.data.detail);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const deleteCustomer = async (customerId) => {
        try {
            await axios.delete(`/api/customers/${customerId}`);
            setCustomers(customers.filter(customer => customer.customerId !== customerId));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const columns = [
        {
            name: 'Name',
            selector: row => `${row.firstName} ${row.lastName}`,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
        },
        {
            name: 'State',
            selector: row => row.country,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div>
                    <Link to={`/customer/edit/${row.customerId}`} className="btn btn-sm btn-warning m-lg-1">Edit</Link>
                    <button onClick={() => deleteCustomer(row.customerId)} className="btn btn-danger btn-sm ml-2">Delete</button>
                </div>
            ),
        },
    ];

    const filteredCustomers = customers.filter(customer =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.city.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.country.toLowerCase().includes(searchText.toLowerCase())
    );

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Email', 'Phone', 'Address', 'City', 'State']],
            body: filteredCustomers.map(customer => [
                `${customer.firstName} ${customer.lastName}`,
                customer.email,
                customer.phone,
                customer.address,
                customer.city,
                customer.country,
            ]),
        });
        doc.save('customers.pdf');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-3">
            <div className="row mb-3 align-items-center">
                <div className="col-md-4">
                    <h4>Customers</h4>
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
                        <CSVLink data={filteredCustomers} filename="customers.csv" className="btn btn-success me-2">Export CSV</CSVLink>
                        <button onClick={exportToPDF} className="btn btn-danger me-2">Export PDF</button>
                        <Link to="/customer/add" className="btn btn-primary">Add Customer</Link>
                    </div>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={filteredCustomers}
                pagination
                responsive
            />
        </div>
    );
};

export default CustomerList;