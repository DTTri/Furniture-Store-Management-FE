import React from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen max-h-screen overflow-hidden w-full flex justify-between bg-gray-100">
      <NavBar />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
