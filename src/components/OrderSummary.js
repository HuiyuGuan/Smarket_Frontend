import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from './OrderCard';  // Import the OrderCard component

function OrderSummary({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(`http://localhost:8080/orders/${user.username}`);
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.order_id} order={order} />)
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default OrderSummary;
