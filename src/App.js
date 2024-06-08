// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import ProductList from "./components/product/ProductList";
import CustomerList from "./components/customer/CustomerList";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/product" element={<ProductList/>} />
                    <Route path="/customer" element={<CustomerList/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
