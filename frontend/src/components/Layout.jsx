import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Sidebar />

      <div className="main-content">
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;