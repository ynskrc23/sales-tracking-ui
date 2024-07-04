import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CustomerUpdate = () => {
    const { id } = useParams(); // URL'den müşteri ID'sini almak için useParams hook'u kullanılır

    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`/api/customers/${id}`);
                setCustomer(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]); // id parametresi değiştiğinde useEffect'in yeniden çalışması sağlanır

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`/api/customers/${id}`, customer);
            alert('Customer updated successfully');
            // İsteği başarıyla gönderdikten sonra istemciyi yeniden yönlendirebilirsiniz veya başka bir işlem yapabilirsiniz.
        } catch (error) {
            console.error('There was an error updating the customer!', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { firstName, lastName, email, phone, address, city, state, zipCode, country } = customer;

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Update Customer</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="firstName" className="mb-1">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="lastName" className="mb-1">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="email" className="mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="phone" className="mb-1">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="address" className="mb-1">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="city" className="mb-1">City</label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            className="form-control"
                            value={city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="state" className="mb-1">State</label>
                        <input
                            id="state"
                            name="state"
                            type="text"
                            className="form-control"
                            value={state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="zipCode" className="mb-1">Zip Code</label>
                        <input
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            className="form-control"
                            value={zipCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4 mb-3">
                        <label htmlFor="country" className="mb-1">Country</label>
                        <input
                            id="country"
                            name="country"
                            type="text"
                            className="form-control"
                            value={country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Update
                </button>
            </form>
        </div>
    );
};

export default CustomerUpdate;
