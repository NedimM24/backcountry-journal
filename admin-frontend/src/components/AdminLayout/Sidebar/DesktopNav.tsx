import { NavLink, useNavigate } from "react-router-dom";
import styles from "./DesktopNav.module.css";

export function DesktopNav() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  }
  return (
    <aside className={styles.container}>
      <nav className={styles.links}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/posts"
          end
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          All Posts
        </NavLink>
        <NavLink
          to="/posts/new-post"
          end
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          New Post
        </NavLink>

        <NavLink
          to="/posts/drafts"
          end
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Drafts
        </NavLink>

        <div className={styles.bottomLinks}>
          <a
            href="place vervel front end here"
            target="_blank"
            rel="noopener noreferrer"
          >
            🌐 View Public Site
          </a>
          <button type="button" className="btn" onClick={handleLogout}>
            ➜] Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
