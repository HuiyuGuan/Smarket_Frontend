import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function PurchaseCart(props) {
  const { user } = props;
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Track total price
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

          // Calculate total price
          const total = response.data.reduce((acc, item) => acc + item.item_price * item.quantity, 0);
          setTotalPrice(total);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      }
    };

    fetchCartItems();
  }, [user]);

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/orders/create", {
        userId: user.userId, // Assuming `user` has a `userId` field
        items: cartItems, // Pass the cart items to the backend
      });

      if (response.status === 200) {
        alert("Order placed successfully!");
        navigate("/orders"); // Redirect to an order summary or history page
      } else {
        alert("Error placing the order.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      alert("Checkout failed.");
    }
  };

  return (
    <>
      {user && user.username ? (
        <div className="purchaseCart">
          <h1>Shopping Cart</h1>
          {cartItems.length ? (
            <>
              {cartItems.map((item) => (
                <div key={item.item_id} className="cart-item-container">
                  <Link to={`/items/${item.item_id}`}>
                    <img
                      className="cart-item-image"
                      src={item.item_image}
                      alt={item.item_name}
                    />
                  </Link>
                  <div className="item-details">
                    <Link to={`/items/${item.item_id}`}>
                      <h2 className="item-name">{item.item_name}</h2>
                    </Link>
                    <p>Price: ${item.item_price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
              <button class="button-70" role="button"onClick={handleCheckout}>Checkout</button> {/* Checkout button */}
            </>
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
