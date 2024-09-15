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
            "https://smarket-backend.vercel.app/purchaseCarts",
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

  // Function to handle deleting an item from the cart
  const handleDeleteItem = async (item_id) => {
    try {
      const response = await axios.delete(
        `https://smarket-backend.vercel.app/purchaseCarts/${user.username}/${item_id}`
      );

      if (response.status === 200) {
        alert("Item removed from cart successfully!");

        // Update the cart state to remove the deleted item
        const updatedCartItems = cartItems.filter(item => item.item_id !== item_id);
        setCartItems(updatedCartItems);

        // Recalculate the total price
        const total = updatedCartItems.reduce((acc, item) => acc + item.item_price * item.quantity, 0);
        setTotalPrice(total);
      } else {
        alert("Error removing item from cart.");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error.message);
      alert("Failed to remove item from cart.");
    }
  };

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      const response = await axios.post('https://smarket-backend.vercel.app/orders/create', {
        username: user.username,  // Pass username instead of userId
        items: cartItems,  // Pass the cart items to the backend
      });

      if (response.status === 200) {
        alert("Order placed successfully!");

        // Clear the cart after successful checkout
        await clearCart(); // Add this line to clear the cart

        navigate("/orders");  // Redirect to an order summary or history page
      } else {
        alert("Error placing the order.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
      alert("Checkout failed.");
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete('https://smarket-backend.vercel.app/purchaseCarts/clear', {
        data: { username: user.username }, // Pass username in the request body
      });
      if (response.status === 200) {
        setCartItems([]); // Clear the cart state in the frontend
        setTotalPrice(0); // Reset total price
      } else {
        console.error("Failed to clear the cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error.message);
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
                    <button className="button-70" onClick={() => handleDeleteItem(item.item_id)}>Delete</button> 
                  </div>
                </div>
              ))}
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
              <button className="button-70" onClick={handleCheckout}>Checkout</button> 
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
