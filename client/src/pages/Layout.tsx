import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Layout() {
  return (
    <div className="h-screen max-h-screen overflow-auto flex flex-col">
      <Header />
      <div className="flex flex-1">
        <NavBar />
        <div className="w-full h-full p-4 bg-gray-200 overflow-hidden">
          <div className="bg-white rounded-md shadow-md h-[98%] max-h-[98%] overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
