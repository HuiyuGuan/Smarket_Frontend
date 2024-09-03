import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import addItemToCart from "./addItemToCart";

export default function PurchaseCart(props) {
  const { user } = props;
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(
            "http://localhost:8080/purchaseCarts",
            {
              params: { username: user.username }, // Send username as query parameter
            }
          );
          setCartItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, [user]);

  // const handleAddToCart = () => {
  //   const item = {
  //     id: 1,
  //     name: "Sample Item",
  //     price: 19.99,
  //     image: "https://example.com/sample-item.jpg",
  //   };

  //   addItemToCart(item, user);
  // };

  return (
    <>
      {user && user.username ? (
        <div className="purchaseCart">
          <h1>Shopping Cart</h1>
          {cartItems.length ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Link to={`/items/${item.item_id}`}>
                  <img
                    className="item-image"
                    src={item.item_image}
                    alt={item.item_name}
                  />
                </Link>
                <div>
                  <Link to={`/items/${item.item_id}`}>
                    <h2>{item.item_name}</h2>
                  </Link>
                  <p>Price: ${item.item_price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
