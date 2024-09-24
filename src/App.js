// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import ProductList from "./components/product/ProductList";
import CustomerList from "./components/customer/CustomerList";
import CustomerForm from "./components/customer/CustomerForm";
import SaleList from "./components/sale/SaleList";
import InvoiceList from "./components/invoice/InvoiceList";
import SalesRepresentativeList from "./components/salesrepresentative/SalesRepresentativeList";
import ProductForm from "./components/product/ProductForm";
import SaleDetails from "./components/sale/SaleDetails";
import SalesRepresentativeAdd from "./components/salesrepresentative/SalesRepresentativeAdd";
import SalesRepresentativeUpdate from "./components/salesrepresentative/SalesRepresentativeUpdate";
import RoleList from "./components/role/RoleList";
import RoleForm from "./components/role/RoleForm";
import MenuList from "./components/menu/MenuList";
import MenuForm from "./components/menu/MenuForm";

const App = () => {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/product" element={<ProductList/>} />
                    <Route path="/product/add" element={<ProductForm/>} />
                    <Route path="/product/edit/:productId" element={<ProductForm/>} />

                    <Route path="/customer" element={<CustomerList/>} />
                    <Route path="/customer/add" element={<CustomerForm/>} />
                    <Route path="/customer/edit/:customerId" element={<CustomerForm/>} />

                    <Route path="/sale" element={<SaleList/>} />
                    <Route path="/sale-details/:id" element={<SaleDetails/>} />

                    <Route path="/invoice" element={<InvoiceList/>} />

                    <Route path="/salesrepresentative" element={<SalesRepresentativeList/>} />
                    <Route path="/salesrepresentative-add" element={<SalesRepresentativeAdd/>} />
                    <Route path="/salesrepresentative-update/:id" element={<SalesRepresentativeUpdate/>} />

	                <Route path="/role" element={<RoleList/>} />
	                <Route path="/role/add" element={<RoleForm/>} />
	                <Route path="/role/edit/:roleId" element={<RoleForm/>} />

	                <Route path="/menu" element={<MenuList/>} />
	                <Route path="/menu/add" element={<MenuForm/>} />
	                <Route path="/menu/edit/:menuId" element={<MenuForm/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
