import React from 'react';
import axios from 'axios';

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            price: '',
            stockQuantity: '',
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

        const { name, description, price, stockQuantity } = this.state;
        const newData = {
            name,
            description,
            price,
            stockQuantity,
        };

        try {
            await axios.post('api/products', newData);
            alert('Product added successfully');
            this.setState({  // Formu sıfırla
                name: '',
                description: '',
                price: '',
                stockQuantity: '',
            });
        } catch (error) {
            console.error('There was an error adding the Product!', error);
        }
    }

    render() {
        const { name, description, price, stockQuantity } = this.state;

        return (
            <div className="container mt-3">
                <h4 className="mb-3">Add Product</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="name" className="mb-1">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="price" className="mb-1">Price</label>
                            <input
                                id="price"
                                name="price"
                                type="price"
                                className="form-control"
                                value={price}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-md-4 mb-3">
                            <label htmlFor="stockQuantity" className="mb-1">Stock Quantity</label>
                            <input
                                id="stockQuantity"
                                name="stockQuantity"
                                type="text"
                                className="form-control"
                                value={stockQuantity}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-md-12 mb-3">
                            <label htmlFor="description" className="mb-1">Description</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                className="form-control"
                                value={description}
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

export default ProductAdd;
