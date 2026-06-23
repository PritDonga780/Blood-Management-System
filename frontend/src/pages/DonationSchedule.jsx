import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

function DonationSchedule() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCamps = async () => {
    try {
      setLoading(true);

      const res = await API.get("/camps");

      setCamps(res.data);
    } catch (error) {
      console.error("Error fetching camps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">Donation Schedule</h5>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-info"
                  role="status"
                >
                  <span className="visually-hidden">
                    Loading...
                  </span>
                </div>
              </div>
            ) : camps.length === 0 ? (
              <div className="alert alert-warning text-center">
                No Donation Camps Found
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Camp Name</th>
                      <th>Address</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {camps.map((camp) => (
                      <tr key={camp._id}>
                        <td>{camp.campName}</td>

                        <td>{camp.address}</td>

                        <td>
                          {new Date(camp.date).toLocaleDateString()}
                        </td>

                        <td>{camp.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DonationSchedule;