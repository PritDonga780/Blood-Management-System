import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import API from "../api/axios";

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");

      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await axios.put(`import.meta.env.VITE_API_URL/requests/${action}/${id}`);

      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success";

      case "Rejected":
        return "bg-danger";

      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <Layout>
      <div className="card shadow mt-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Blood Requests</h5>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : requests.length === 0 ? (
            <div className="alert alert-info">No blood requests found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Patient Name</th>
                    <th>Blood Group</th>
                    <th>Units</th>
                    <th>Hospital</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id}>
                      <td>{request.patientName}</td>

                      <td>
                        <span className="badge bg-danger">
                          {request.bloodGroup}
                        </span>
                      </td>

                      <td>{request.units}</td>

                      <td>{request.hospital}</td>

                      <td>{request.reason}</td>

                      <td>
                        <span
                          className={`badge ${getStatusBadge(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td>
                        {request.status === "Pending" ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() =>
                                updateStatus(request._id, "approve")
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                updateStatus(request._id, "reject")
                              }
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default BloodRequests;
