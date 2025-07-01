import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.jsx";

export default function AdminLayout() {
  return (
    <div className="flex h-screen ">
      <SideBar />
      <main className="flex-1 p-4 bg-[#E4C59E] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
