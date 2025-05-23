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
