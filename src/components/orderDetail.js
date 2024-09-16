import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetail() {
  const { orderId } = useParams(); // Get orderId from the route parameters
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`https://smarket-backend.vercel.app/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  const formattedDate = new Date(order.order_date).toLocaleString();

  return (
    <div>
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order.order_id}</p>
      <p><strong>Username:</strong> {order.username}</p>
      <p><strong>Total Price:</strong> ${order.total}</p>
      <p><strong>Order Date:</strong> {formattedDate}</p>

      <h2>Items in this Order:</h2>
      {order.orderItems && order.orderItems.length > 0 ? (
        <ul>
          {order.orderItems.map((orderItem) => (
            <li key={orderItem.item_id}>
              {orderItem.item.item_name} - {orderItem.quantity} x ${orderItem.item.item_price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in this order.</p>
      )}
    </div>
  );
}

export default OrderDetail;
