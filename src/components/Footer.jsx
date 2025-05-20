import "../styles/Footer.css";
import "../App.css";

function Footer() {
  const currentYear = new Date().getFullYear;

  return (
    <footer className="footer">
      <div className="contact-information">
        <h3 className="drone-delights-footer">Drone Delights</h3>
        <a href="mailto:info@dronedelights.com">Mail: info@dronedelights.com</a>
        <p>Phone: 0707-070707</p>
        <p>© {currentYear} Drone Delights</p>
      </div>
    </footer>
  );
}

export default Footer;
