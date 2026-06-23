import { NavLink } from "react-router-dom";
import "../styles/Dashboard.css"
import { useState } from "react";
function Sidebar() {
  return (
    <div className="sidebar">
      <h3>🩸 BloodBank</h3>

      <NavLink
        to="/dashboard"
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/blood-stock"
        
      >
        Blood Stock
      </NavLink>

      <NavLink
        to="/blood-requests"
        
      >
        Blood Requests
      </NavLink>

      <NavLink
        to="/request-blood"
        
      >
        Request Blood
      </NavLink>

      <NavLink
        to="/donors"
        
      >
        Donors
      </NavLink>
      <NavLink
        to="/donation-camp"
        
      >
        Donation Camp
      </NavLink>
      <NavLink
        to="/donation-schedule"
        
      >
        Donation Schedule
      </NavLink>

      <NavLink
        to="/profile"
        
      >
        Profile
      </NavLink>

      <NavLink
        to="/settings"
        
      >
        Settings
      </NavLink>

      <NavLink
        to="/notifications"
        
      >
        Notifications
      </NavLink>
    </div>
  );
}

export default Sidebar;
