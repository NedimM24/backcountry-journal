import { MobileNav } from "./Sidebar/MobileNav";
import { DesktopNav } from "./Sidebar/DesktopNav";
import styles from "./AdminLayout.module.css";

export function AdminLayout() {
  return (
    <div>
      <div className={styles.mobileNav}>
        <MobileNav />
      </div>

      <div className={styles.desktopNav}>
        <DesktopNav />
      </div>
    </div>
  );
}
