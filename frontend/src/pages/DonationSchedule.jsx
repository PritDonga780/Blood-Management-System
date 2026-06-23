import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function DonationSchedule() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCamps = async () => {
    try {
      const res = await axios.get(
        "import.meta.env.VITE_API_URL/camps"
      );

      setCamps(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  return (
    <Layout>
      <div className="card shadow mt-4">

        <div className="card-header bg-info text-white">
          Donation Schedule
        </div>

        <div className="card-body">

          {loading ? (
            <div className="text-center">
              Loading...
            </div>
          ) : (
            <table className="table table-hover">

              <thead>
                <tr>
                  <th>Camp</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>

                {camps.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center"
                    >
                      No Donation Camps Found
                    </td>
                  </tr>
                ) : (
                  camps.map((camp) => (
                    <tr key={camp._id}>
                      <td>{camp.campName}</td>

                      <td>{camp.address}</td>

                      <td>
                        {new Date(
                          camp.date
                        ).toLocaleDateString()}
                      </td>

                      <td>{camp.time}</td>
                    </tr>
                  ))
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </Layout>
  );
}

export default DonationSchedule;