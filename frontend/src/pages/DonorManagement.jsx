import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import API from "../api/axios";

function DonorManagement() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await API.get("/donors");
      setDonors(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch donors");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/donors/${editId}`, formData);
        toast.success("Donor Updated Successfully");
      } else {
        await API.post("/donors", formData);
        toast.success("Donor Added Successfully");
      }

      setFormData({
        name: "",
        bloodGroup: "",
        phone: "",
        email: "",
      });

      setEditId(null);

      fetchDonors();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Operation Failed"
      );
    }
  };

  const handleEdit = (donor) => {
    setEditId(donor._id);

    setFormData({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      phone: donor.phone,
      email: donor.email,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete donor?")) return;

    try {
      await API.delete(`/donors/${id}`);

      toast.success("Donor Deleted Successfully");

      fetchDonors();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  const filteredDonors = donors.filter((donor) =>
    donor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="card shadow mt-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Donor Management</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                name="bloodGroup"
                className="form-control"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-1">
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>

          <hr />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search donor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th width="160">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Donors Found
                    </td>
                  </tr>
                ) : (
                  filteredDonors.map((donor) => (
                    <tr key={donor._id}>
                      <td>{donor.name}</td>

                      <td>
                        <span className="badge bg-danger">
                          {donor.bloodGroup}
                        </span>
                      </td>

                      <td>{donor.phone}</td>

                      <td>{donor.email}</td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(donor)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(donor._id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DonorManagement;