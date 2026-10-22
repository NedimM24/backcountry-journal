import { StatCard } from "../../components/StatCard/StatCard";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div>
      <h1>Welcome to the dashboard</h1>
      <div className={styles.statCardGrid}>
        {" "}
        {/* statCardGrid container */}
        <StatCard title={"Total posts"} count={12} />
        <StatCard title={"Drafts"} count={2} />
        <StatCard title={"Comments"} count={44} />
      </div>
    </div>
  );
}

export default Dashboard;
