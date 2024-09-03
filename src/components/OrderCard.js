import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrderCard(props) {
  const order = props.order;
  const [item, setItem] = useState([]);

  async function getItem() {
    const items = await axios.get("http://localhost:8080/items");
    if (items) {
      setItem(items.data.filter((item) => item.item_id === order.item_id));
    }
    props.fetchOrder();
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="ordercard">
      <small>
        Order placed: {order.createdAt} Total Price: ${order.total.toFixed(2)}
      </small>
      {item.length !== 0 && (
        <>
          <h2>{item[0].name}</h2>
          <img src={item[0].image} alt={item[0].name} width="500px" />
        </>
      )}
    </div>
  );
}
