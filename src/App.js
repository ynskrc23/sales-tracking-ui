import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import ProductList from "./components/product/ProductList";
import CustomerList from "./components/customer/CustomerList";
import CustomerForm from "./components/customer/CustomerForm";
import SaleList from "./components/sale/SaleList";
import InvoiceList from "./components/invoice/InvoiceList";
import ProductForm from "./components/product/ProductForm";
import SaleDetails from "./components/sale/SaleDetails";
import RoleList from "./components/role/RoleList";
import RoleForm from "./components/role/RoleForm";
import MenuList from "./components/menu/MenuList";
import MenuForm from "./components/menu/MenuForm";
import CategoryForm from "./components/category/CategoryForm";
import CategoryList from "./components/category/CategoryList";
import SalesPersonForm from "./components/salesperson/SalesPersonForm";
import SalesPersonList from "./components/salesperson/SalesPersonList";
import UserForm from "./components/user/UserForm";
import UserList from "./components/user/UserList";
import LoginPage from './components/auth/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute'; // PrivateRoute importu

const App = () => {
	return (
		<Router>
			<div className="container">
				<Routes>
					{/* Login Page */}
					<Route path="/" element={<LoginPage />} />

					{/* Protected Routes */}
					<Route
						path="/*"
						element={
							<>
								<Navbar />
								<Routes>
									<Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

									<Route path="/user" element={<PrivateRoute><UserList /></PrivateRoute>} />
									<Route path="/user/add" element={<PrivateRoute><UserForm /></PrivateRoute>} />
									<Route path="/user/edit/:userId" element={<PrivateRoute><UserForm /></PrivateRoute>} />

									<Route path="/product" element={<PrivateRoute><ProductList /></PrivateRoute>} />
									<Route path="/product/add" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
									<Route path="/product/edit/:productId" element={<PrivateRoute><ProductForm /></PrivateRoute>} />

									<Route path="/customer" element={<PrivateRoute><CustomerList /></PrivateRoute>} />
									<Route path="/customer/add" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
									<Route path="/customer/edit/:customerId" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />

									<Route path="/role" element={<PrivateRoute><RoleList /></PrivateRoute>} />
									<Route path="/role/add" element={<PrivateRoute><RoleForm /></PrivateRoute>} />
									<Route path="/role/edit/:roleId" element={<PrivateRoute><RoleForm /></PrivateRoute>} />

									<Route path="/menu" element={<PrivateRoute><MenuList /></PrivateRoute>} />
									<Route path="/menu/add" element={<PrivateRoute><MenuForm /></PrivateRoute>} />
									<Route path="/menu/edit/:menuId" element={<PrivateRoute><MenuForm /></PrivateRoute>} />

									<Route path="/category" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
									<Route path="/category/add" element={<PrivateRoute><CategoryForm /></PrivateRoute>} />
									<Route path="/category/edit/:categoryId" element={<PrivateRoute><CategoryForm /></PrivateRoute>} />

									<Route path="/salesperson" element={<PrivateRoute><SalesPersonList /></PrivateRoute>} />
									<Route path="/salesperson/add" element={<PrivateRoute><SalesPersonForm /></PrivateRoute>} />
									<Route path="/salesperson/edit/:salespersonId" element={<PrivateRoute><SalesPersonForm /></PrivateRoute>} />

									<Route path="/sale" element={<PrivateRoute><SaleList /></PrivateRoute>} />
									<Route path="/sale-details/:id" element={<PrivateRoute><SaleDetails /></PrivateRoute>} />

									<Route path="/invoice" element={<PrivateRoute><InvoiceList /></PrivateRoute>} />
								</Routes>
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;