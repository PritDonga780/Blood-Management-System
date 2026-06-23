import Layout from "../components/Layout";

function Profile() {
  const user = {
    name: "Prit Donga",
    email: "prit@gmail.com",
    bloodGroup: "O+",
  };

  return (
    <Layout>
      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-body text-center">

            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="rounded-circle mb-3"
            />

            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <p>
              Blood Group :
              <strong>
                {" "}
                {user.bloodGroup}
              </strong>
            </p>

            <button className="btn btn-danger">
              Edit Profile
            </button>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Profile;