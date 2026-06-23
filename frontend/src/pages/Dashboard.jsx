import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    bloodUnits: 0,
    requests: 0,
    donors: 0,
    recentRequests: [],
  });

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await axios.get(
        "import.meta.env.VITE_API_URL/dashboard/stats"
      );

      setStats(statsRes.data);

      const notificationRes =
        await axios.get(
          "import.meta.env.VITE_API_URL/notifications"
        );

      setNotifications(
        notificationRes.data
      );
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    }
  };

  return (
    <Layout>
      <h2 className="mt-4">
        Welcome Back 👋
      </h2>

      {/* Statistics Cards */}
      <div className="row g-4 mt-2">

        <div className="col-md-4">
          <div className="stat-card">
            <h3>{stats.bloodUnits}</h3>
            <p>Total Blood Units</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <h3>{stats.requests}</h3>
            <p>Total Requests</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <h3>{stats.donors}</h3>
            <p>Total Donors</p>
          </div>
        </div>

      </div>

      {/* Blood Bank Overview */}
      <div className="card mt-4 shadow-sm">

        <div className="card-header bg-danger text-white">
          Blood Bank Overview
        </div>

        <div className="card-body">

          <p>
            Manage blood inventory,
            donor records and blood
            requests efficiently.
          </p>

          <div className="row text-center mt-3">

            <div className="col-md-4">
              <h5 className="text-danger">
                🩸 Blood Units
              </h5>

              <h4>
                {stats.bloodUnits}
              </h4>
            </div>

            <div className="col-md-4">
              <h5 className="text-primary">
                📋 Requests
              </h5>

              <h4>
                {stats.requests}
              </h4>
            </div>

            <div className="col-md-4">
              <h5 className="text-success">
                👨‍⚕️ Donors
              </h5>

              <h4>
                {stats.donors}
              </h4>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Requests + Notifications */}
      <div className="row mt-4">

        {/* Recent Requests */}
        <div className="col-lg-8">

          <div className="card shadow-sm">

            <div className="card-header bg-primary text-white">
              Recent Requests
            </div>

            <div className="card-body">

              <table className="table table-hover">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {stats.recentRequests &&
                  stats.recentRequests.length > 0 ? (

                    stats.recentRequests.map(
                      (request) => (
                        <tr
                          key={
                            request._id
                          }
                        >
                          <td>
                            {
                              request.patientName
                            }
                          </td>

                          <td>
                            {
                              request.bloodGroup
                            }
                          </td>

                          <td>
                            <span className="badge bg-warning">
                              {request.status ||
                                "Pending"}
                            </span>
                          </td>
                        </tr>
                      )
                    )

                  ) : (

                    <tr>
                      <td
                        colSpan="3"
                        className="text-center"
                      >
                        No Requests
                        Found
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* Notifications */}
        <div className="col-lg-4">

          <div className="card shadow-sm">

            <div className="card-header bg-warning">
              Notifications
            </div>

            <div className="card-body">

              {notifications.length ===
              0 ? (

                <p>
                  No notifications
                </p>

              ) : (

                notifications.map(
                  (item) => (
                    <div
                      key={item._id}
                      className="notification-item"
                    >
                      {item.message}
                    </div>
                  )
                )

              )}

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;