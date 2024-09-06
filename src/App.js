import "./App.css";
import React from "react";
import { useState } from "react";
//import { useEffect} from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";
//import axios from "axios"
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import User from "./components/User";
import UserProfile from "./components/UserProfile";
import UserSale from "./components/UserSale";
import UserFeedback from "./components/UserFeedback";
import Orders from "./components/Orders";
import PurchaseCart from "./components/PurchaseCart";
import ProductProfile from "./components/ProductProfile";
import Search from "./components/Search";
import AddProduct from "./components/AddProduct";

function App() {
  const [user, setUser] = useState([]);

  function setlogin(value) {
    setUser(value);
  }

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Layout user={user} setlogin={setlogin} />}
          >
            <Route index element={<Home />} />
            <Route
              path="/login"
              element={<Login user={user} setlogin={setlogin} />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/sale/add" element={<AddProduct user={user} />} />
            <Route path="/user" element={<User user={user} />} />
            <Route path="/user/profile" element={<UserProfile user={user} />} />
            <Route path="/user/sale" element={<UserSale user={user} />} />
            <Route
              path="/user/feedback"
              element={<UserFeedback user={user} />}
            />
            <Route path="/order" element={<Orders user={user} />} />
            <Route
              path="/PurchaseCart"
              element={<PurchaseCart user={user} />}
            />
            <Route
              path="/items/:item_id"
              element={<ProductProfile user={user} />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
