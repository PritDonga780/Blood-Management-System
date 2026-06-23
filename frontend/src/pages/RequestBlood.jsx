import { useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import API from "../api/axios";

function RequestBlood() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/requests", formData);

      console.log(res.data);

      toast.success("Request Submitted Successfully");

      setFormData({
        patientName: "",
        bloodGroup: "",
        units: "",
        hospital: "",
        reason: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <Layout>
      <div className="card shadow mt-4">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">Request Blood</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Patient Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />

            <select
              className="form-control mb-3"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>

              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Units Required"
              name="units"
              value={formData.units}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              placeholder="Hospital Name"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
            />

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-danger">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default RequestBlood;
