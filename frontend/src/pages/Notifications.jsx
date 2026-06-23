import { useEffect, useState } from "react";
import API from "../api/axios";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await API.get("/notifications");

      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">Notifications</h5>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="text-center py-4">
            <div
              className="spinner-border text-warning"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="alert alert-info text-center">
            No Notifications Available
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className="alert alert-success mb-2"
            >
              {item.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;