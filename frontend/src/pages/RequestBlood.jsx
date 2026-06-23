import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function RequestBlood() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    reason: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    console.log("Submit clicked");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "import.meta.env.VITE_API_URL/requests",
        formData,
      );

      console.log(res.data);

      toast.success("Request Submitted");
    } catch (error) {
      console.error(error);

      toast.error("Failed to submit request");
    }
  };

  return (
    <Layout>
      <div className="card shadow mt-4">
        <div className="card-header bg-danger text-white">Request Blood</div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Patient Name"
              name="patientName"
              onChange={handleChange}
            />

            <select
              className="form-control mb-3"
              name="bloodGroup"
              onChange={handleChange}
            >
              <option>Select Blood Group</option>

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
              className="form-control mb-3"
              placeholder="Units Required"
              name="units"
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              placeholder="Hospital Name"
              name="hospital"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              rows="4"
              placeholder="Reason"
              name="reason"
              onChange={handleChange}
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
