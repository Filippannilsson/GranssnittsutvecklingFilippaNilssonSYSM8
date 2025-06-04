import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getUserOrders } from "../services/api";
import MyOrderOverview from "../components/MyOrderOverview";
import MyFavorites from "../components/MyFavorites";
import "../styles/Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { user, logoutUser, isLoggedIn } = useUser();
  const [userOrders, setUserOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");

  //Om inte inloggad, skicka till startsidan
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  //Hämta användarens beställningar
  useEffect(() => {
    if (user && user.id) {
      fetchUserOrders();
    }
  }, [user]);

  //Funktion för att hämta users beställningar från API
  async function fetchUserOrders() {
    try {
      const orders = await getUserOrders(user.id);

      //Sortera orders, nyast först
      const sortedOrders = orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      //Spara sorterade beställningar
      setUserOrders(sortedOrders);
      console.log("User orders loaded:", sortedOrders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setUserOrders([]);
    }
  }

  //Funktion för att logga ut
  function handleLogout() {
    //Anropa från userContext
    logoutUser();
    navigate("/login");
  }

  //Funktion för att byta flik
  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  return (
    <main className="profile-main">
      <section className="profile-section">
        <header className="profile-header">
          <h1 className="profile-welcome">Welcome {user?.username}</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </header>

        <div className="profile-body">
          <nav className="profile-nav">
            <button
              className={`nav-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => handleTabChange("orders")}
            >
              My Orders
            </button>
            <button
              className={`nav-btn ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => handleTabChange("favorites")}
            >
              Favorites
            </button>
          </nav>

          <div className="profile-divider"></div>

          <div className="profile-content">
            {activeTab === "orders" && (
              <div className="orders-section">
                {userOrders?.length > 0 ? (
                  //Loopa igenom och visa alla beställningar
                  userOrders.map((order) => (
                    <MyOrderOverview key={order.id} orderData={order} />
                  ))
                ) : (
                  <p className="no-order-results">
                    You haven't placed any orders yet
                  </p>
                )}
              </div>
            )}

            {activeTab === "favorites" && <MyFavorites />}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
