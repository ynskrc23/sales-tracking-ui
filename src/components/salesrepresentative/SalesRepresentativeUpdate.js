import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SalesRepresentativeUpdate = () => {
    const { id } = useParams(); // URL'den müşteri ID'sini almak için useParams hook'u kullanılır

    const [SalesRepresentative, setSalesRepresentative] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesRepresentative = async () => {
            try {
                const response = await axios.get(`/api/salesrepresentatives/${id}`);
                setSalesRepresentative(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesRepresentative();
    }, [id]); // id parametresi değiştiğinde useEffect'in yeniden çalışması sağlanır

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSalesRepresentative({ ...SalesRepresentative, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.put(`/api/salesrepresentatives/${id}`, SalesRepresentative);
            alert('Sales Representative updated successfully');
            // İsteği başarıyla gönderdikten sonra istemciyi yeniden yönlendirebilirsiniz veya başka bir işlem yapabilirsiniz.
        } catch (error) {
            console.error('There was an error updating the SalesRepresentative!', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { firstName, lastName, email, phone } = SalesRepresentative;

    return (
        <div className="container mt-3">
            <h4 className="mb-3">Update Sales Representative</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-6 mb-3">
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
                    <div className="form-group col-md-6 mb-3">
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
                    <div className="form-group col-md-6 mb-3">
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
                    <div className="form-group col-md-6 mb-3">
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
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Update
                </button>
            </form>
        </div>
    );
};

export default SalesRepresentativeUpdate;
