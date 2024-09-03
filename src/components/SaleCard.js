import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SaleCard(props) {
  const item = props.item;

  return (
    <div className="salecard">
      <img
        className="item-image"
        src={item.image}
        alt={item.name}
        width="350px"
        height="350px"
      />
      <Link to={`/${item.name}/profile`} state={{ item: item }}>
        <h3>{item.name}</h3>
      </Link>
      <h4>Stock:{item.stock}</h4>
      <h3>price: ${item.price.toFixed(2)}</h3>
      <button
        onClick={async () => await props.delete(item.item_id)}
        class="button-70"
        role="button"
      >
        Delete
      </button>
    </div>
  );
}
