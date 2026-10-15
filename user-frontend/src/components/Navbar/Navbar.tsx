import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export function Navbar() {
  //HANDLE FUNCTION REMOVES AUTH TOKEN THEN SENDS USER TO THE LOGIN PAGE
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/">All</Link>
        <span>|</span>
        <Link to="/hiking">Hiking</Link>
        <span>|</span>
        <Link to="/camping">Camping</Link>
        <span>|</span>
        <Link to="/backpacking">Backpacking</Link>
        <span>|</span>
        <Link to="/gear">Gear</Link>
        <span>|</span>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </div>
  );
}
