import React from 'react';
import axios from 'axios';

class SalesRepresentativeAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
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

        const { firstName, lastName, email, phone } = this.state;
        const newData = {
            firstName,
            lastName,
            email,
            phone
        };

        try {
            await axios.post('api/salesrepresentatives', newData);
            alert('SalesRepresentative added successfully');
            this.setState({  // Formu sıfırla
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            });
        } catch (error) {
            console.error('There was an error adding the SalesRepresentative!', error);
        }
    }

    render() {
        const { firstName, lastName, email, phone } = this.state;

        return (
            <div className="container mt-3">
                <h4 className="mb-3">Add Sales Representative</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-6 mb-3">
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
                        <div className="form-group col-md-6 mb-3">
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
                        <div className="form-group col-md-6 mb-3">
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
                        <div className="form-group col-md-6 mb-3">
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

                    </div>

                    <button type="submit" className="btn btn-primary mt-3">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

export default SalesRepresentativeAdd;
