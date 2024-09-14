import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function Search(props) {
  const location = useLocation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    searchItem(location.state.item);
  }, [location.state.item]);

  async function searchItem(filter) {
    const items = await axios.get("https://smarket-backend.vercel.app/items");
    if (items) {
      setItems(
        items.data.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }

  const result = items.map((item) => (
    <ProductCard key={item.item_id} item={item} />
  ));

  return (
    <div className="search">
      <h2 className="searchTitle">
        Currently searching: {location.state.item}
      </h2>
      {result}
    </div>
  );
}
