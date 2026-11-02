import styles from "./AuthHeader.module.css";
import mountainImage from "../../assets/m5.jpg";

export function AuthHeader() {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${mountainImage})` }}
    >
      <div className="photo-font">
        <h1>Join the Backcountry Journal</h1>
        <h4>Join our community, get outside, explore</h4>
      </div>

      <br />
    </header>
  );
}
