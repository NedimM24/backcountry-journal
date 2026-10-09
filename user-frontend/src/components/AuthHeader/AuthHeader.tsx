import styles from "./AuthHeader.module.css";
import mountainImage from "../../assets/m5.jpg";

export function AuthHeader() {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${mountainImage})` }}
    >
      <h1>Join the Backcountry Journal</h1>
      <h4>Join our community, get outside, explore</h4>
      <br />
      <h4>Go</h4>
    </header>
  );
}
