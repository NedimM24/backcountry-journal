import { MobileNav } from "./Sidebar/MobileNav";
import { DesktopNav } from "./Sidebar/DesktopNav";
import styles from "./AdminLayout.module.css";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.mobileNav}>
        <MobileNav />
      </div>

      <div className={styles.desktopNav}>
        <DesktopNav />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
