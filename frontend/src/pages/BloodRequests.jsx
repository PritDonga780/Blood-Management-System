import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/axios";

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blood requests
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

  // Update request status
  const updateStatus = async (id, action) => {
    try {
      await API.put(`/requests/${action}/${id}`);
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      alert(
        error.response?.data?.message || "Failed to update request status.",
      );
    }
  };

  // Badge colors
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
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">Blood Requests</h4>
          </div>

          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              </div>
            ) : requests.length === 0 ? (
              <div className="alert alert-info text-center">
                No blood requests found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Patient Name</th>
                      <th>Blood Group</th>
                      <th>Units</th>
                      <th>Hospital</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th width="180">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((request) => (
                      <tr key={request._id}>
                        <td>{request.patientName}</td>

                        <td>
                          <span className="badge bg-danger fs-6">
                            {request.bloodGroup}
                          </span>
                        </td>

                        <td>{request.units}</td>

                        <td>{request.hospital}</td>

                        <td>{request.reason}</td>

                        <td>
                          <span
                            className={`badge ${getStatusBadge(
                              request.status,
                            )}`}
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
                                Approve
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
                            <span className="text-muted">Completed</span>
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
      </div>
    </Layout>
  );
}

export default BloodRequests;
