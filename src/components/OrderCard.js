import React from 'react';
import { Link } from 'react-router-dom';

function OrderCard({ order }) {
  return (
    <div className="order-card">
      <h3>Order ID: {order.order_id}</h3>
      <p>Total: ${order.total}</p>
      <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
      <Link to={`/orders/${order.order_id}`}>View Details</Link>
    </div>
  );
}

export default OrderCard;
