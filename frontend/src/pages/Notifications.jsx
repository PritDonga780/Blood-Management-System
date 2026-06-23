import { useEffect, useState } from "react";
import axios from "axios";

function Notification() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchNotifications =
    async () => {
      try {

        const res =
          await axios.get(
            "import.meta.env.VITE_API_URL/notifications"
          );

        setNotifications(
          res.data
        );

      } catch (error) {

        console.error(
          "Error fetching notifications:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="card shadow-sm">

      <div className="card-header bg-warning">
        Notifications
      </div>

      <div className="card-body">

        {loading ? (

          <div className="text-center">
            Loading...
          </div>

        ) : notifications.length === 0 ? (

          <p>No notifications</p>

        ) : (

          notifications.map(
            (item) => (
              <div
                key={item._id}
                className="notification-item alert alert-success"
              >
                {item.message}
              </div>
            )
          )

        )}

      </div>

    </div>
  );
}

export default Notification;