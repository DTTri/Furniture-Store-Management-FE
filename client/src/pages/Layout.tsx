import React from "react";
import NavBar from "../components/NavBar"; // Đảm bảo đường dẫn này đúng với cấu trúc dự án
import { Outlet } from "react-router-dom"; // Sử dụng Outlet để render các page con
import Header from "../components/header"; // Import Header vào layout

export default function Layout() {
  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content area - chứa NavBar và phần nội dung chính */}
      <div className="flex flex-1">
        {/* Sidebar - NavBar */}
        <NavBar />

        {/* Main content */}
        <div className="w-full h-full flex flex-col mt-[40px] p-4 pb-8 bg-gray-200">
          {/* Outlet renders the child route components */}
          <div className=" bg-white rounded-md shadow-md max-h-screen overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
