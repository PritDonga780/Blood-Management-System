import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";
import API from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    bloodUnits: 0,
    requests: 0,
    donors: 0,
    recentRequests: [],
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await API.get("/dashboard/stats");

      setStats(statsRes.data);

      const notificationRes = await API.get("/notifications");

      setNotifications(notificationRes.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="mt-4">Welcome Back 👋</h2>

        {/* Statistics */}
        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="card shadow border-0 text-center p-4">
              <h2 className="text-danger">{stats.bloodUnits}</h2>
              <p className="mb-0">Total Blood Units</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 text-center p-4">
              <h2 className="text-primary">{stats.requests}</h2>
              <p className="mb-0">Total Requests</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 text-center p-4">
              <h2 className="text-success">{stats.donors}</h2>
              <p className="mb-0">Total Donors</p>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="card mt-4 shadow">
          <div className="card-header bg-danger text-white">
            Blood Bank Overview
          </div>

          <div className="card-body">
            <p>
              Manage blood inventory, donor records and blood requests
              efficiently.
            </p>

            <div className="row text-center">
              <div className="col-md-4">
                <h5>🩸 Blood Units</h5>
                <h3>{stats.bloodUnits}</h3>
              </div>

              <div className="col-md-4">
                <h5>📋 Requests</h5>
                <h3>{stats.requests}</h3>
              </div>

              <div className="col-md-4">
                <h5>👨‍⚕️ Donors</h5>
                <h3>{stats.donors}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests & Notifications */}
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                Recent Requests
              </div>

              <div className="card-body">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Blood Group</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {stats.recentRequests &&
                    stats.recentRequests.length > 0 ? (
                      stats.recentRequests.map((request) => (
                        <tr key={request._id}>
                          <td>{request.patientName}</td>
                          <td>{request.bloodGroup}</td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              {request.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No Requests Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-warning">
                Notifications
              </div>

              <div className="card-body">
                {notifications.length === 0 ? (
                  <p>No Notifications</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className="alert alert-light border mb-2"
                    >
                      {item.message}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;