import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/Navbar";

export default function Layout({ searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
