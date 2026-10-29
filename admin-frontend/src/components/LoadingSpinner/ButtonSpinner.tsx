import styles from "./ButtonSpinner.module.css";

export function ButtonSpinner() {
  return <span className={styles.spinner} role="status" aria-label="Loading" />;
}
