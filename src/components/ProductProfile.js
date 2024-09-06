import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import addItemToCart from "./addItemToCart";

export default function ProductProfile(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = props.user;
  
  // Get item from location.state or use item_id from URL params
  const { item_id: paramItemId } = useParams(); // Use params for item_id from URL
  const itemFromState = location.state?.item || null; // Item might come from state if navigated from another component
  const item_id = location.state?.item_id || paramItemId; // Use item_id from location state or URL params

  const [item, setItem] = useState(itemFromState); // Initialize with state item or null
  const [qty, setQty] = useState(1); // Quantity default to 1
  const [qtyError, setQtyError] = useState("");

  // Fetch item details if not provided via location.state
  useEffect(() => {
    if (!item && item_id) {
      const fetchItemDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/items/${item_id}`);
          setItem(response.data); // Set the fetched item data
          console.log("Fetched Item:", response.data);
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItemDetails();
    }
  }, [item, item_id]);

    // Add debug logs
    useEffect(() => {
      console.log("User:", user);
      console.log("Item:", item);
      console.log("Item ID:", item_id);
    }, [user, item, item_id]);
  
  function validate() {
    let isValidate = true;
    if (!user || !user.username) {
      isValidate = false;
      navigate("/login");
    }
    if (qty < 1 || qty > item.stock) {
      setQtyError("Qty must be between 1 and " + item.stock);
      isValidate = false;
    } else {
      setQtyError("");
    }
    return isValidate;
  }

  async function buy() {
    try {
      await axios.post("http://localhost:8080/orders", {
        username: user.username,
        item_id: item.item_id,
        order_date: new Date().toISOString(), // Use current date
        total: item.price * qty,
      });

      await axios.put(`http://localhost:8080/items/${item.item_id}`, {
        name: item.name,
        price: item.price,
        stock: item.stock - qty,
        image: item.image,
        seller: item.seller,
        description: item.description,
      });

      navigate("/order");
    } catch (error) {
      console.error("Error processing purchase:", error);
    }
  }

  if (!item || Object.keys(item).length === 0) {
    return <div>Error: Item data is not available</div>;
  }

  return (
    <div className="productprofile">
      <h3>{item.name}</h3>
      <img
        className="item-image"
        src={item.image}
        alt={item.name}
        width="500px"
      />
      <h4>Price: ${item.price?.toFixed(2)}</h4>
      <h4>Stock: {item.stock}</h4>
      <h4>Seller: {item.seller}</h4>
      <p>{item.description}</p>

      {user.username !== item.seller && (
        <>
          <div>
            <label>
              Qty:
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value, 10))}
                min="1"
                max={item.stock}
              />
            </label>
            {qtyError && <p style={{ color: "red" }}>{qtyError}</p>}
          </div>

          <button
            onClick={() => {
              if (validate()) {
                buy();
              }
            }}
            className="button-70"
            role="button"
          >
            Buy
          </button>

          <button
            onClick={() => addItemToCart(item, user)}
            className="button-70"
            role="button"
          >
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
}
