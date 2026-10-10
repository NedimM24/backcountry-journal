import logo from "../../assets/backcountry-logo-green.svg";
import styles from "./Home.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import cartoonMountainImageLarge from "../../assets/trail_background_2440x1440.png";
import cartoonMountainImageSmall from "../../assets/trail_background_iphone_landscape_2556x1179.png";

function Home() {
  return (
    <div>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img
          src={logo}
          alt="Baclcountry Journal Logo"
          className={styles.logo}
        />
        <Navbar></Navbar>
      </div>

      {/* BOTTOM CONTAINER */}
      <div className={styles.bottomContainer}>
        {/* HEADER WITH A SUMMARY OF THE WEBSITE */}
        <header
          className={styles.header}
          style={{ backgroundImage: `url(${cartoonMountainImageSmall})` }}
        >
          <h2>It's time to get outdoors.</h2>
          <h6>
            Field stories on hiking, camping, backpacking, gear, & everything in
            between.
          </h6>
        </header>

        {/* MAIN CONTENT WITH ALL THE BLOG POSTS */}
        <main></main>
      </div>
    </div>
  );
}

export default Home;
