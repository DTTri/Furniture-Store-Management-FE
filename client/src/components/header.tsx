import React, { useState } from "react";
import { FaCog } from "react-icons/fa"; // Biểu tượng cài đặt
import avatarImg from "../assets/Logo.png"; // Import ảnh từ thư mục assets
import logoImg from "../assets/Logo.png"; // Import logo từ thư mục assets

// Định nghĩa kiểu dữ liệu cho user
interface User {
  avatar: string;
  name: string;
  role: string;
}

const Header: React.FC = () => {
  // Dữ liệu người dùng
  const user: User = {
    avatar: avatarImg, // Sử dụng ảnh đã import
    name: "Chris Miguel", // Tên người dùng
    role: "Manager", // Vai trò người dùng
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="TopNavDefault w-full h-[45px] px-8 py-6 bg-white border-b border-[#e4e4e6] flex justify-between items-center z-50">
      {/* Logo và Tên cửa hàng */}
      <div className="LeftMenu flex items-center space-x-3">
        {/* Logo */}
        <div className="Logo w-8 h-8">
          <img
            className="w-full h-full object-cover"
            src={logoImg}
            alt="Logo"
          />
        </div>

        {/* Tên cửa hàng */}
        <div className="StoreName text-[#15191e] text-2xl font-semibold font-['Dancing Script'] leading-[30px]">
          HOME
        </div>
      </div>

      <div className="RightMenu relative flex items-center space-x-4">
        <div className="User flex items-center space-x-3">
          <div className="Avatar rounded-full overflow-hidden w-10 h-10">
            <img
              className="Image w-full h-full object-cover"
              src={user.avatar}
              alt="Avatar"
            />
          </div>
          <div onClick={toggleDropdown} className="Text select-none cursor-pointer flex-col justify-start items-start">
            <div className="ChrisMiguel text-[#15191e] text-sm font-normal font-['TT Hoves'] leading-[21px]">
              {user.name}
            </div>
            <div className="Freelancer text-[#627188] text-xs font-normal font-['TT Hoves Pro Trial'] leading-[18px]">
              {user.role}
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute w-[150px] right-[-24px] top-[45px] rounded-sm bg-[#f1eeee] shadow-lg flex flex-col transition-all ease-in-out transform scale-100">
              <div className="p-1 text-[14px] border border-b-[1px] border-b-neutral-400  hover:bg-gray-300 cursor-pointer">Personal Information</div>
              <div className="p-1 text-[14px] border border-b-[1px] border-b-neutral-400 hover:bg-gray-300 cursor-pointer">Dark Mode</div>
              <div className="p-1 text-[14px] border border-b-[1px] border-b-neutral-400 hover:bg-gray-300 cursor-pointer">Setting</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
