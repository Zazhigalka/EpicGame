import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import RegisterSuccess from "../components/auth/RegisterSuccess";
import AddProduct from "../components/product/AddProduct/AddProduct";
import ProductList from "../components/product/ProductList/ProductList";
import ProductDetails from "../components/product/ProductDetails/ProductDetails";
import EditProduct from "../components/product/EditProduct/EditProduct";
import Favorites from "../components/favorites/Favorites";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="favorites" element={<Favorites />} />

      <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
    </Routes>
  );
};

export default MainRoutes;
