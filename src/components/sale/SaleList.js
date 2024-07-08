import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SaleList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalSalesAmount, setTotalSalesAmount] = useState(0);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('/api/sales/grouped-by-sale-number');
                setSales(response.data);
                calculateTotalSalesAmount(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const calculateTotalSalesAmount = (salesData) => {
        let totalAmount = 0;
        salesData.forEach(sale => {
            totalAmount += sale[2]; // Index 2 contains Total Amount
        });
        setTotalSalesAmount(totalAmount);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const capitalizeName = (name) => {
        if (!name) return '';
        const names = name.split(' ');
        const capitalizedNames = names.map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());
        return capitalizedNames.join(' ');
    };

    return (
        <div className="container">
            <h4 className="mt-3">Sale List</h4>
            <p>Total Sales Amount: {formatCurrency(totalSalesAmount)}</p>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Sale Number</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Product Details</th>
                    <th>Total Amount</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((saleGroup, index) => (
                    <tr key={index}>
                        {index === 0 || saleGroup[0] !== sales[index - 1][0] ? (
                            <>
                                <td rowSpan={sales.filter(sale => sale[0] === saleGroup[0]).length} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    {saleGroup[0]}
                                </td>
                                <td>{capitalizeName(`${saleGroup[3].firstName} ${saleGroup[3].lastName}`)}</td>
                                <td>{saleGroup[3].email}</td>
                                <td>{saleGroup[3].phone}</td>
                                <td>{saleGroup[3].country}</td>
                                <td>
                                    <p>{saleGroup[4].name}</p>
                                    <p>Price: {formatCurrency(saleGroup[4].price)}</p>
                                    <p>Quantity: {saleGroup[1]}</p>
                                    <p>Total Amount: {formatCurrency(saleGroup[2])}</p>
                                </td>
                                <td rowSpan={sales.filter(sale => sale[0] === saleGroup[0]).length} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    {formatCurrency(sales.filter(sale => sale[0] === saleGroup[0])
                                        .reduce((total, sale) => total + sale[2], 0))}
                                </td>
                                <td rowSpan={sales.filter(sale => sale[0] === saleGroup[0]).length} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    <Link to={`/sale-details/${saleGroup[0]}`} className="btn btn-sm btn-warning m-lg-1">Details</Link>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{capitalizeName(`${saleGroup[3].firstName} ${saleGroup[3].lastName}`)}</td>
                                <td>{saleGroup[3].email}</td>
                                <td>{saleGroup[3].phone}</td>
                                <td>{saleGroup[3].country}</td>
                                <td>
                                    <p>{saleGroup[4].name}</p>
                                    <p>Price: {formatCurrency(saleGroup[4].price)}</p>
                                    <p>Quantity: {saleGroup[1]}</p>
                                    <p>Total Amount: {formatCurrency(saleGroup[2])}</p>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SaleList;