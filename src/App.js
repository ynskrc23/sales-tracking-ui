// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import ProductList from "./components/product/ProductList";
import CustomerList from "./components/customer/CustomerList";
import SaleList from "./components/sale/SaleList";
import InvoiceList from "./components/invoice/InvoiceList";
import SalesRepresentativeList from "./components/salesrepresentative/SalesRepresentativeList";
import CustomerAdd from "./components/customer/CustomerAdd";
import CustomerUpdate from "./components/customer/CustomerUpdate";
import ProductAdd from "./components/product/ProductAdd";
import ProductUpdate from "./components/product/ProductUpdate";
import SaleDetails from "./components/sale/SaleDetails";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/product" element={<ProductList/>} />
                    <Route path="/customer" element={<CustomerList/>} />
                    <Route path="/sale" element={<SaleList/>} />
                    <Route path="/invoice" element={<InvoiceList/>} />
                    <Route path="/salesrepresentative" element={<SalesRepresentativeList/>} />
                    <Route path="/customer-add" element={<CustomerAdd/>} />
                    <Route path="/customer-update/:id" element={<CustomerUpdate/>} />
                    <Route path="/product-add" element={<ProductAdd/>} />
                    <Route path="/product-update/:id" element={<ProductUpdate/>} />
                    <Route path="/sale-details/:id" element={<SaleDetails/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
