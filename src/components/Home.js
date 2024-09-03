import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function Home() {
  const [random, setRandom] = useState([]);

  async function getRandom() {
    const items = await axios.get("http://localhost:8080/items");
    if (items) {
      setRandom(
        shuffle(
          items.data.map((item) => (
            <ProductCard key={item.item_id} item={item} />
          ))
        )
      );
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  useEffect(() => {
    getRandom();
  }, []);

  const result = [];
  for (let i = 0; i < 20; ++i) {
    result.push(random[i]);
  }

  return (
    <div className="home">
      <h2>Random</h2>
      <div className="random">{result}</div>
    </div>
  );
}
