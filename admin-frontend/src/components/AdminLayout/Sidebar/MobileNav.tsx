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
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        Menu
      </button>

      {open && (
        <div>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/new-post">New Post</Link>
            <Link to="/comments">Comments</Link>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
