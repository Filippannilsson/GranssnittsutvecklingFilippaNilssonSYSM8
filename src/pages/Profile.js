import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import "../App.css";
import MyOrderOverview from "../components/MyOrderOverview";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Funktionalitet senare
    navigate("/login");
  };

  return (
    <main className="profile-main">
      <section className="profile-section">
        <header className="profile-header">
          <h1 className="profile-welcome">Welcome Username</h1>
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
              <MyOrderOverview />
              <MyOrderOverview />
              <MyOrderOverview />
              {/* <p>Your orders will appear here...</p> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
