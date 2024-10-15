import { Outlet } from "react-router-dom";
import HomeNavbar from "../../components/Navbar/HomeNavbar";
export default function Main() {
  return (
    <div>
      <header>
        <HomeNavbar />
      </header>
      <main className="h-hero">
        <Outlet />
      </main>
    </div>
  );
}
