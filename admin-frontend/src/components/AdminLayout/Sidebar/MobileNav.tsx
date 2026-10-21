import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <button
        className="btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        ≡
      </button>

      {open && (
        <div>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/posts/new">New Post</Link>
            <div>
              <a
                href="place vervel front end here"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Public Site
              </a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
