import logo from "../../assets/backcountry-logo-green.svg";
import styles from "./Home.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { FeaturedCard } from "../../components/BlogCard/FeaturedCard";
import { BlogGrid } from "../../components/BlogCard/BlogGrid";
import cartoonMountainImageLarge from "../../assets/trail_background_2440x1440.png";
import cartoonMountainImageSmall from "../../assets/trail_background_iphone_landscape_2556x1179.png";
import { Link } from "react-router-dom";

function Home() {
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
        <main>
          {/* FEATURED POST SAME ACCROSS ALL CATEGORIES */}
          <FeaturedCard />
          <BlogGrid />
        </main>
      </div>
    </div>
  );
}

export default Home;
