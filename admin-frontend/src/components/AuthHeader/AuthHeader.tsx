import styles from "./AuthHeader.module.css";
import mountainImage from "../../assets/m5.jpg";

export function AuthHeader() {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${mountainImage})` }}
    >
      <div className="photo-font">
        <h1>Backcountry Journal</h1>
        <h4>Get outside, explore</h4>
      </div>
    </header>
  );
}
