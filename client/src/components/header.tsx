import React from "react";
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

    return (
        <div className="TopNavDefault fixed top-0 left-0 w-full h-[45px] px-8 py-6 bg-white border-b border-[#e4e4e6] flex justify-between items-center z-50 mb-6">
            {/* Logo và Tên cửa hàng */}
            <div className="LeftMenu flex items-center space-x-3">
                {/* Logo */}
                <div className="Logo w-8 h-8">
                    <img className="w-full h-full object-cover" src={logoImg} alt="Logo" />
                </div>

                {/* Tên cửa hàng */}
                <div className="StoreName text-[#15191e] text-2xl font-semibold font-['Dancing Script'] leading-[30px]">
                    HOME
                </div>
            </div>

            {/* Phần bên phải - biểu tượng cài đặt và thông tin người dùng */}
            <div className="RightMenu flex items-center space-x-4">
                {/* Biểu tượng cài đặt */}
                <div className="Icon p-2 flex justify-center items-center w-10 h-10">
                    <FaCog size={24} className="text-gray-600" />
                </div>

                {/* Thông tin người dùng */}
                <div className="User flex items-center space-x-3">
                    {/* Avatar người dùng */}
                    <div className="Avatar rounded-full overflow-hidden w-10 h-10">
                        {/* Thêm ảnh vào avatar */}
                        <img className="Image w-full h-full object-cover" src={user.avatar} alt="Avatar" />
                    </div>

                    {/* Tên người dùng và vai trò */}
                    <div className="Text flex-col justify-start items-start">
                        <div className="ChrisMiguel text-[#15191e] text-sm font-normal font-['TT Hoves'] leading-[21px]">
                            {user.name}
                        </div>
                        <div className="Freelancer text-[#627188] text-xs font-normal font-['TT Hoves Pro Trial'] leading-[18px]">
                            {user.role}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
