import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function DonorManagement() {

  const [donors, setDonors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      bloodGroup: "",
      phone: "",
      email: "",
    });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors =
    async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/donors"
        );

      setDonors(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  const handleChange =
    (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/donors/${editId}`,
          formData
        );

        toast.success(
          "Donor Updated"
        );

      } else {

        await axios.post(
          "http://localhost:5000/api/donors",
          formData
        );

        toast.success(
          "Donor Added"
        );

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

      toast.error(
        "Operation Failed"
      );

    }
  };

  const handleEdit =
    (donor) => {

    setEditId(donor._id);

    setFormData({
      name: donor.name,
      bloodGroup:
        donor.bloodGroup,
      phone: donor.phone,
      email: donor.email,
    });

  };

  const handleDelete =
    async (id) => {

    if (
      !window.confirm(
        "Delete donor?"
      )
    )
      return;

    try {

      await axios.delete(
        `http://localhost:5000/api/donors/${id}`
      );

      toast.success(
        "Donor Deleted"
      );

      fetchDonors();

    } catch {

      toast.error(
        "Delete Failed"
      );

    }
  };

  const filteredDonors =
    donors.filter((donor) =>
      donor.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <Layout>

      <div className="card shadow mt-4">

        <div className="card-header bg-success text-white">
          Donor Management
        </div>

        <div className="card-body">

          <form
            onSubmit={
              handleSubmit
            }
            className="row g-3"
          >

            <div className="col-md-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                name="bloodGroup"
                className="form-control"
                placeholder="Blood Group"
                value={
                  formData.bloodGroup
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="col-md-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="col-md-1">
              <button
                type="submit"
                className="btn btn-success w-100"
              >
                {editId
                  ? "Update"
                  : "Add"}
              </button>
            </div>

          </form>

          <hr />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search donor..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <div className="table-responsive">

            <table className="table table-hover">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredDonors.map(
                  (donor) => (
                    <tr
                      key={
                        donor._id
                      }
                    >
                      <td>
                        {donor.name}
                      </td>

                      <td>
                        <span className="badge bg-danger">
                          {
                            donor.bloodGroup
                          }
                        </span>
                      </td>

                      <td>
                        {donor.phone}
                      </td>

                      <td>
                        {donor.email}
                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            handleEdit(
                              donor
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              donor._id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  )
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