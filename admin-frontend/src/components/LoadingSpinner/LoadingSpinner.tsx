import styles from "./LoadingSpinner.module.css";

type LoadingSpinnerProps = {
  message?: string;
};

export function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className={styles.loading} role="status">
      <div className={styles.loader} aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
