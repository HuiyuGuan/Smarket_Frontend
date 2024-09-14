import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";

export default function Orders(props) {
  const [order, setOrder] = useState([]);
  const user = props.user;
  const navigate = useNavigate();

  //   async function fetchOrder() {
  //     const orders = await axios.get("http://localhost:8080/orders");
  //     if (orders) {
  //       setOrder(orders.data.filter((order) => order.username === user.username));
  //     }
  //   }
  async function fetchOrder() {
    try {
      const response = await axios.get("https://smarket-backend.vercel.app/orders");
      if (response.data) {
        setOrder(
          response.data.filter((order) => order.username === user.username)
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if (!user || !user.username) {
      navigate("/"); // Redirect if user is not authenticated or invalid
    } else {
      fetchOrder();
    }
  }, [user, navigate]); // Run effect when user or navigate changes

  const result =
    order.length !== 0 ? (
      order.map((orderItem) => (
        <OrderCard
          key={orderItem.order_id}
          order={orderItem}
          fetchOrder={fetchOrder}
        />
      ))
    ) : (
      <h1>There is currently no order</h1>
    );

  return (
    <>
      {user && user.username && (
        <div className="Order">
          <h1>Your Order</h1>
          {result}
        </div>
      )}
    </>
  );
}
