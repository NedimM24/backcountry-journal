import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "../Home/Home.module.css";
import logo from "../../assets/backcountry-logo-green.svg";

function BlogPage() {
  const { id } = useParams();

  return (
    <div>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={logo}
            alt="Backcountry Journal Logo"
            className={styles.logo}
          />
        </Link>
        <Navbar />
      </div>

      <p>You are now viewing Post Id: {id}</p>
    </div>
  );
}

export default BlogPage;
