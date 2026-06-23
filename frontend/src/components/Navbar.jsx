import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar-custom">
      <div>
        <h4 className="m-0">
          🩸 Blood Management System
        </h4>
      </div>

      <div
        className="profile-section"
        onClick={() => setOpen(!open)}
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
        />

        {open && (
          <div className="dropdown-custom">
            <p onClick={() => navigate("/profile")}>
              <FaUserCircle /> Profile
            </p>

            <p onClick={() => navigate("/settings")}>
              <FaCog /> Settings
            </p>

            <p onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </p>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;  