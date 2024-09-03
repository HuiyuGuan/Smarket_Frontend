import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function ProductCard(props) {
  const item = props.item;
  return (
    <div className="productcard">
      <img
        src={item.image}
        alt={item.name}
        className="item-image"
        width="350px"
      />
      <Link to={`/items/${item.item_id}`} state={{ item: item }}>
        <h4>{item.name}</h4>
      </Link>
      <h4>price: ${item.price.toFixed(2)}</h4>
    </div>
  );
}
// const ItemList = () => (
//   <div className="item-list">
//     {items.map((item) => (
//       <Item key={item.id} {...item} />
//     ))}
//   </div>
// );
