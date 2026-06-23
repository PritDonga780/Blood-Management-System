import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import API from "../api/axios";

function DonationCamp() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    campName: "",
    address: "",
    date: "",
    time: "",
    organizer: "",
    contact: "",
  });

  const fetchCamps = async () => {
    try {
      setLoading(true);

      const res = await API.get("/camps");

      setCamps(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load camps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/camps", formData);

      toast.success("Camp Added Successfully");

      setFormData({
        campName: "",
        address: "",
        date: "",
        time: "",
        organizer: "",
        contact: "",
      });

      fetchCamps();
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Camp");
    }
  };

  const deleteCamp = async (id) => {
    try {
      await API.delete(`/camps/${id}`);

      toast.success("Camp Deleted");

      fetchCamps();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  return (
    <Layout>
      <div className="card shadow mt-4">
        <div className="card-header bg-danger text-white">
          Donation Camp Schedule
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Camp Name"
              name="campName"
              value={formData.campName}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              className="form-control mb-3"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <input
              type="time"
              className="form-control mb-3"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Organizer"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-danger">
              Add Camp
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow mt-4">
        <div className="card-header bg-primary text-white">
          Upcoming Donation Camps
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : camps.length === 0 ? (
            <div className="alert alert-info">
              No Donation Camps Found
            </div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Camp</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
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

                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteCamp(camp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DonationCamp;