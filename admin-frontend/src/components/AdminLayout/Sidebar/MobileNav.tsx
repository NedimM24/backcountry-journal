import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MobileNav.module.css";
import logo from "../../../assets/backcountry-logo-light.svg";

export function MobileNav() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  }
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header className={styles.mobileHeader}>
        <button
          type="button"
          className="btn"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          ≡
        </button>
        <img
          src={logo}
          alt="Backcountry Journal Logo"
          className={styles.logo}
        />
      </header>

      {open && (
        <>
          <button
            type="button"
            className={styles.backdrop}
            onClick={() => setOpen(false)}
            aria-label="Close Navigation"
          />
          <aside
            className={styles.container}
            id="mobile-navigation"
            aria-label="Mobile Navigation"
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              X
            </button>
            <nav className={styles.links}>
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/posts"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                All Posts
              </NavLink>
              <NavLink
                to="/posts/new-post"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
              >
                New Post
              </NavLink>

              <NavLink
                to="/posts/drafts"
                end
                onClick={() => setOpen(false)}
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
        </>
      )}
    </div>
  );
}
