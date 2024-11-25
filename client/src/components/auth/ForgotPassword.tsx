import React from 'react';
import { useNavigate } from 'react-router-dom';  // Để điều hướng
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Icon mũi tên quay lại

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();  // Khởi tạo useNavigate để điều hướng trang

    const handleGoBack = () => {
        navigate('/loginpage');  // Điều hướng về trang login
    };

    return (
        <div className="relative w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
            {/* Nút quay lại */}
            <button
                onClick={handleGoBack}
                className="absolute top-4 left-4 bg-transparent p-2 rounded-full text-blue-500 hover:bg-gray-100 transition-colors"
            >
                <ArrowBackIcon /> {/* Mũi tên quay lại */}
            </button>

            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                Change Password
            </h2>
            <form>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="telephone"
                    >
                        Telephone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="telephone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all"
                        placeholder="Enter your phone number"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Please enter your registered phone number.
                    </p>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="staff-id"
                    >
                        Staff ID <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="staff-id"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all"
                        placeholder="Enter your staff ID"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Your unique employee identification number.
                    </p>
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="new-password"
                    >
                        New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all"
                        placeholder="Enter new password"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Choose a strong password with at least 8 characters.
                    </p>
                </div>

                <div className="mb-6">
                    <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="repeat-password"
                    >
                        Repeat New Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        id="repeat-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all"
                        placeholder="Re-enter new password"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Confirm your new password.
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors shadow-lg transform hover:-translate-y-1"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
