import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      <Route
        path="/notifications"
        element={<Notifications />}
      />

    </Routes>
  );
}

export default AppRoutes;