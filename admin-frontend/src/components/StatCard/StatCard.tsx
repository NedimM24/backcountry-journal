import styles from "./StatCard.module.css";

type StatCardProps = {
  title: string;
  count: number;
};

export function StatCard(props: StatCardProps) {
  return (
    <div className={styles.statCard}>
      <div>
        <b>{props.count}</b>
      </div>
      <div>{props.title}</div>
    </div>
  );
}
