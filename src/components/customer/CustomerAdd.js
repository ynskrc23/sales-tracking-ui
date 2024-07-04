import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(event) {
        event.preventDefault();

        const { firstName, lastName, email, phone, address, city, state, zipCode, country } = this.state;
        const newData = {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            country,
        };

        try {
            await axios.post('api/customers', newData);
            alert('Customer added successfully');
            this.setState({  // Formu sıfırla
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
        } catch (error) {
            console.error('There was an error adding the customer!', error);
        }
    }

    render() {
        const { firstName, lastName, email, phone, address, city, state, zipCode, country } = this.state;

        return (
            <div className="container mt-3">
                <h4 className="mb-3">Add Customer</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="firstName" className="mb-1">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

export default CustomerAdd;
