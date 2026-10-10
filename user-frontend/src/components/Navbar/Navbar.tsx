import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export function Navbar() {
  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/hiking">Hiking</Link>
        <span>|</span>
        <Link to="/camping">Camping</Link>
        <span>|</span>
        <Link to="/backpacking">Backpacking</Link>
        <span>|</span>
        <Link to="/gear">Gear</Link>
        <span>|</span>
        <Link to="/logout">Logout</Link>
      </nav>
    </div>
  );
}
