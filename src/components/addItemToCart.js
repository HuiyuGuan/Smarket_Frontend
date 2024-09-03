import axios from "axios";

export default async function addItemToCart(item, user) {
  try {
    const response = await axios.post("http://localhost:8080/purchaseCarts", {
      item_id: item.id,
      username: user.username,
      item_name: item.name,
      item_price: item.price,
      item_image: item.image,
    });

    console.log("Item added to cart:", response.data);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
}
