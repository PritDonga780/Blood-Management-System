import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { toast } from "react-toastify";

function BloodStock() {
  const [stock, setStock] = useState([]);

  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "",
  });

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const fetchStock = async () => {
    try {

      setLoading(true);

      const res = await axios.get(
        "import.meta.env.VITE_API_URL/blood-stock"
      );

      setStock(res.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setActionLoading(true);

      await axios.post(
        "import.meta.env.VITE_API_URL/blood-stock",
        formData
      );

      toast.success(
        "Blood Stock Added"
      );

      setFormData({
        bloodGroup: "",
        units: "",
      });

      fetchStock();

    } catch (error) {

      toast.error(
        "Failed to add stock"
      );

    } finally {

      setActionLoading(false);

    }
  };

  const deleteStock = async (id) => {
    try {

      setActionLoading(true);

      await axios.delete(
        `import.meta.env.VITE_API_URL/blood-stock/${id}`
      );

      toast.success(
        "Stock Deleted"
      );

      fetchStock();

    } catch (error) {

      toast.error(
        "Delete Failed"
      );

    } finally {

      setActionLoading(false);

    }
  };

  return (
    <Layout>

      {/* Add Blood Stock */}

      <div className="card shadow mt-4">

        <div className="card-header bg-danger text-white">
          Add Blood Stock
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row g-3">

              <div className="col-md-5">

                <select
                  className="form-control"
                  name="bloodGroup"
                  value={
                    formData.bloodGroup
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select Blood Group
                  </option>

                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>

                </select>

              </div>

              <div className="col-md-4">

                <input
                  type="number"
                  className="form-control"
                  placeholder="Units"
                  name="units"
                  value={
                    formData.units
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="col-md-3">

                <button
                  className="btn btn-danger w-100"
                  disabled={
                    actionLoading
                  }
                >

                  {actionLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>

                      Processing...
                    </>
                  ) : (
                    "Add Stock"
                  )}

                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

      {/* Stock Table */}

      <div className="card shadow mt-4">

        <div className="card-header bg-primary text-white">
          Available Blood Stock
        </div>

        <div className="card-body">

          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border text-danger"
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>

            </div>

          ) : stock.length === 0 ? (

            <div className="alert alert-warning">
              No Blood Stock Available
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

                  <tr>
                    <th>
                      Blood Group
                    </th>

                    <th>
                      Units
                    </th>

                    <th>
                      Action
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {stock.map(
                    (item) => (
                      <tr
                        key={
                          item._id
                        }
                      >

                        <td>

                          <span className="badge bg-danger">
                            {
                              item.bloodGroup
                            }
                          </span>

                        </td>

                        <td>
                          {
                            item.units
                          }
                        </td>

                        <td>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              deleteStock(
                                item._id
                              )
                            }
                            disabled={
                              actionLoading
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

          )}

        </div>

      </div>

    </Layout>
  );
}

export default BloodStock;