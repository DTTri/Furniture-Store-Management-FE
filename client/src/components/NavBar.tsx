import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import {
  FaChartBar,
  FaFileInvoice,
  FaBoxes,
  FaShoppingCart,
  FaTag,
  FaTruck,
  FaUsers,
  FaUserTie,
  FaGift,
  FaShieldAlt,
  FaHammer,
  FaUserEdit,
} from "react-icons/fa";
import { sUser } from "../store";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/" },
    { name: "Invoice", icon: <FaFileInvoice />, path: "/invoice" },
    { name: "Inventory", icon: <FaBoxes />, path: "/inventory" },
    { name: "Product", icon: <FaShoppingCart />, path: "/product" },
    { name: "Category", icon: <FaTag />, path: "/category" },
    { name: "Supplier", icon: <FaTruck />, path: "/provider" },
    { name: "Customer", icon: <FaUsers />, path: "/customer" },
    { name: "Staff", icon: <FaUserTie />, path: "/staff" },
    { name: "Promotion", icon: <FaGift />, path: "/promotion" },
    { name: "Warranty", icon: <FaShieldAlt />, path: "/warranty" },
    { name: "Repair", icon: <FaHammer />, path: "/repair" },
    { name: "Role", icon: <FaUserEdit />, path: "/role" },
  ];

  const [selectedMenu, setSelectedMenu] = useState<string>("Dashboard");
  const currentPath = window.location.pathname;
  useEffect(() => {
    const path = currentPath;
    const menuItem = menuItems.find((item) => item.path === path);
    if (menuItem) {
      setSelectedMenu(menuItem.name);
    }
  }, [currentPath]);
  // Hàm xử lý click vào menu item
  const handleMenuClick = (path: string, name: string) => {
    setSelectedMenu(name); // Cập nhật menu item được chọn
    navigate(path); // Dẫn đến trang tương ứng
  };

  const userRole = sUser.use((v) => v.role);

  return (
    <div className="NavBar w-52 bg-white h-full flex flex-col shadow-md transition-all duration-300">
      <div className="NavItems flex flex-col">
        {menuItems.map((item) => {
          if (item.name === "Role" && userRole > 1) return;
          return (
            <div
              key={item.name}
              className={`ListMenu py-3 px-4 flex items-center w-full cursor-pointer hover:bg-[#f2f2f2] transition-all duration-100 ${
                selectedMenu === item.name
                  ? "bg-[#c1c1c1] text-[#156fee] font-bold border-l-4 border-[#156fee]"
                  : "bg-white text-[#70747b] font-medium"
              }`}
              onClick={() => handleMenuClick(item.path, item.name)} // Xử lý click và điều hướng
            >
              <div className="Icon w-6 h-6 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="Text ml-4">{item.name}</div>
            </div>
          );
        })}
      </div>
      {/* Button Log Out (Centered) */}
      <div
        className="SignOutBtn w-[164px] h-10 bg-[#d91316] rounded-[10px] shadow flex justify-center items-center cursor-pointer mx-auto mt-4"
        onClick={() => navigate("/loginpage")}
      >
        <div className="Text text-white text-base font-medium font-['Product sans'] leading-normal">
          Log Out
        </div>
      </div>
    </div>
  );
};

export default NavBar;
