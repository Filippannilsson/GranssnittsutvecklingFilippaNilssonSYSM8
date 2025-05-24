const BASE_URL = "http://localhost:3018";

//Hämtar allt från menu
export const getMenu = () => {
  return fetch(`${BASE_URL}/menu`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching menu: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching menu:", error);
      throw error;
    });
};

//Hämtar populära rätter
export const getPopularItems = () => {
  return fetch(`${BASE_URL}/menu?popular=true`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching popular items: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching popular items:", error);
      throw error;
    });
};

//Hämtar meny baserat på kategori
export const getMenuByCategory = (category) => {
  return fetch(`${BASE_URL}/menu?category=${category}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching ${category}: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Error fetching category ${category}:`, error);
      throw error;
    });
};

//Skapar en ny beställning
export const createOrder = (orderData) => {
  //Lägg till tidsstämpel, status och ordernummer
  const orderWithTimestamp = {
    ...orderData,
    createdAt: new Date().toISOString(),
    status: "pending",
    orderNumber: `DD-${Date.now()}`,
  };

  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderWithTimestamp),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error creating order: ${response.status}`);
      }
      return response.json();
    })
    .then((createdOrder) => {
      console.log("Order created successfully with ID:", createdOrder.id);
      console.log("Order number:", createdOrder.orderNumber);
      return createdOrder;
    })
    .catch((error) => {
      console.error("Error creating order:", error);
      throw error;
    });
};
