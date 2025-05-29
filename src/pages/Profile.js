import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getUserOrders } from "../services/api";
import "../styles/Profile.css";
import "../App.css";
import MyOrderOverview from "../components/MyOrderOverview";

function Profile() {
  const navigate = useNavigate();
  const { user, logoutUser, isLoggedIn } = useUser();
  const [userOrders, setUserOrders] = useState([]);
  // const [isLoadingOrders, setIsLoadingOrders] = useState(true);

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

  async function fetchUserOrders() {
    try {
      // setIsLoadingOrders(true);
      const orders = await getUserOrders(user.id);

      //Sortera orders, nyast först
      const sortedOrders = orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setUserOrders(sortedOrders);
      console.log("User orders loaded:", sortedOrders);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setUserOrders([]);
    } finally {
      // setIsLoadingOrders(false);
    }
  }

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <main className="profile-main">
      <section className="profile-section">
        <header className="profile-header">
          <h1 className="profile-welcome">Welcome {user?.name}</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </header>

        <div className="profile-body">
          <nav className="profile-nav">
            <button className="nav-btn active">My Orders</button>
            <button className="nav-btn">Favorites</button>
          </nav>

          <div className="profile-divider"></div>

          <div className="profile-content">
            <div className="orders-section">
              {userOrders?.length > 0 ? (
                userOrders.map((order) => (
                  <MyOrderOverview key={order.id} orderData={order} />
                ))
              ) : (
                <p className="no-order-results">
                  You haven't placed any orders yet
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
