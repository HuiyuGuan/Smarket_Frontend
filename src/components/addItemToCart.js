import axios from 'axios';

export default async function addItemToCart(item, user) {
  try {
    // Check if the item already exists in the user's purchase cart
    const response = await axios.get('http://localhost:8080/purchaseCarts', {
      params: {
        item_id: item.item_id,  // Ensure this is the correct item_id
        username: user.username,  // Ensure this is the correct username
      },
    });

    const existingItem = response.data;

    if (existingItem) {
      // If the item exists, update the quantity
      const updatedQuantity = existingItem.quantity + 1;
      await axios.put(`http://localhost:8080/purchaseCarts/${user.username}/${existingItem.item_id}`, {
        quantity: updatedQuantity,
      });
      console.log('Item quantity updated:', updatedQuantity);
    } else {
      // If the item does not exist, add it as a new entry
      await axios.post('http://localhost:8080/purchaseCarts', {
        item_id: item.item_id,
        username: user.username,
        item_name: item.name,
        item_price: item.price,
        item_image: item.image,
        quantity: 1,  // Default quantity
      });
      console.log('Item added to cart');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle the 404 (Not Found) case when the item doesn't exist
      // Add the item to the cart if it doesn't exist
      await axios.post('http://localhost:8080/purchaseCarts', {
        item_id: item.item_id,
        username: user.username,
        item_name: item.name,
        item_price: item.price,
        item_image: item.image,
        quantity: 1,  // Default quantity
      });
      console.log('Item added to cart after not being found.');
    } else {
      console.error('Error adding item to cart:', error);
    }
  }
}
