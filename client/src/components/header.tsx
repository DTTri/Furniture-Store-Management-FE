import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa"; // Biểu tượng cài đặt
import avatarImg from "../assets/Logo.png"; // Import ảnh từ thư mục assets
import logoImg from "../assets/Logo.png"; // Import logo từ thư mục assets
import { sUser } from "../store";
import { Staff } from "../entities";
import LoadingProgress from "./LoadingProgress";
import UpdateStaffInfoPopup from "./staffPage/UpdateStaffInfoPopup";
import { Navigate, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  // Dữ liệu người dùng
  const sStaff = sUser.use((cur) => cur.info);
  const [user, setUser] = useState<Staff>(sStaff);

  const nav = useNavigate();

  useEffect(() => {
    if (sStaff) {
      setUser(sStaff);
    }
  }, [sStaff]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateStaffInfoPopupOpen, setIsUpdateStaffInfoPopupOpen] =
    useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onCloseUpdateStaffInfo = () => {
    setIsUpdateStaffInfoPopupOpen(false);
  };

  const handleOnLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    nav("/login");
  };
  if (!user) {
    return <LoadingProgress />;
  }
  console.log("user", user);
  return (
    <div className="TopNavDefault w-full h-[45px] px-8 py-6 bg-white border-b border-[#e4e4e6] flex justify-between items-center z-50">
      {/* Logo và Tên cửa hàng */}
      <div
        className="LeftMenu flex items-center space-x-3 cursor-pointer"
        onClick={() => {
          nav("/");
        }}
      >
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
              src={logoImg}
              alt="Avatar"
            />
          </div>
          <div
            onClick={toggleDropdown}
            className="Text select-none cursor-pointer flex-col justify-start items-start"
          >
            <div className="ChrisMiguel text-[#15191e] text-sm font-normal font-['TT Hoves'] leading-[21px]">
              {user.fullname}
            </div>
            <div className="Freelancer text-[#627188] text-xs font-normal font-['TT Hoves Pro Trial'] leading-[18px]">
              {user.Account !== undefined ? user.Account.Role.name : "Staff"}
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute w-[150px] right-[-24px] top-[45px] rounded-sm bg-[#f1eeee] shadow-lg flex flex-col transition-all ease-in-out transform scale-100">
              <div
                className="p-1 text-[14px] border border-b-[1px] border-b-neutral-400  hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  toggleDropdown();
                  setIsUpdateStaffInfoPopupOpen(true);
                }}
              >
                Personal Information
              </div>
              <div className="p-1 text-[14px] border border-b-[1px] border-b-neutral-400 hover:bg-gray-300 cursor-pointer">
                Setting
              </div>
              <div
                className="p-1 text-[14px] border border-b-[1px] border-b-neutral-400 hover:bg-gray-300 cursor-pointer"
                onClick={handleOnLogout}
              >
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
      {isUpdateStaffInfoPopupOpen && (
        <UpdateStaffInfoPopup staff={user} onClose={onCloseUpdateStaffInfo} />
      )}
    </div>
  );
};

export default Header;
