import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SaleCard from "./SaleCard";

export default function UserSale(props) {
  const [sale, setSale] = useState([]);

  const user = props.user;
  const navigate = useNavigate();

  async function deleteSale(id) {
    await axios.delete("https://smarket-backend.vercel.app/items/" + id);
    fetchSale();
  }

  async function fetchSale() {
    const sale = await axios.get("https://smarket-backend.vercel.app/items");
    if (sale) {
      setSale(sale.data.filter((item) => item.seller === user.username));
    }
  }

  useEffect(() => {
    fetchSale();
  }, []);

  const result = sale.map((item) => (
    <SaleCard key={item.item_id} item={item} delete={deleteSale} />
  ));

  return (
    <>
      {user.length !== 0 && (
        <div className="sale">
          <div className="sale-heading">
            <h1>Your Sale</h1>
            <Link to="/user/sale/add">
              <button class="button-70" role="button">
                Add Sale
              </button>
            </Link>
          </div>
          {result}
        </div>
      )}
      {user.length === 0 && navigate("/")}
    </>
  );
}
