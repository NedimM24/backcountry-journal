import logo from "../../assets/backcountry-logo-green.svg";
import styles from "../Home/Home.module.css";
import { Navbar } from "../../components/Navbar/Navbar";
import { BlogGrid } from "../../components/BlogCard/BlogGrid";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import cartoonMountainImageLarge from "../../assets/trail_background_2440x1440.png";
import cartoonMountainImageSmall from "../../assets/trail_background_iphone_landscape_2556x1179.png";

function Category() {
  const { category } = useParams();

  const normalizedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : undefined;

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
          <BlogGrid category={normalizedCategory} />
        </main>
      </div>
    </div>
  );
}

export default Category;
