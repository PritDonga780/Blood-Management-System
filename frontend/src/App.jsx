import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import BloodStock from "./pages/BloodStock";
import BloodRequests from "./pages/BloodRequests";
import RequestBlood from "./pages/RequestBlood";
import DonorManagement from "./pages/DonorManagement";
import DonationSchedule from "./pages/DonationSchedule";
import DonationCamp from "./pages/DonationCamp";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request-blood"
          element={
            <ProtectedRoute>
              <RequestBlood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donors"
          element={
            <ProtectedRoute>
              <DonorManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/donation-camp" element={<DonationCamp />} />
        <Route
          path="/donation-schedule"
          element={
            <ProtectedRoute>
              <DonationSchedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blood-stock"
          element={
            <ProtectedRoute>
              <BloodStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blood-requests"
          element={
            <ProtectedRoute>
              <BloodRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
