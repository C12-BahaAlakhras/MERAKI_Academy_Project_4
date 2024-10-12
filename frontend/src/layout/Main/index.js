import { Outlet } from "react-router-dom";

import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import HomeNavbar from "../../components/Navbar/HomeNavbar";

export default function Main() {
  return (
    <div>
      <header>
        <DashboardNavbar />
        <HomeNavbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
