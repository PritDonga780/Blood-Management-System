import Layout from "../components/Layout";

function Settings() {
  return (
    <Layout>

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header bg-danger text-white">
            Settings
          </div>

          <div className="card-body">

            <div className="mb-3">

              <label>
                Old Password
              </label>

              <input
                type="password"
                className="form-control"
              />

            </div>

            <div className="mb-3">

              <label>
                New Password
              </label>

              <input
                type="password"
                className="form-control"
              />

            </div>

            <button className="btn btn-danger">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Settings;