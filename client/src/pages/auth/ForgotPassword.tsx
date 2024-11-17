import React, { useState, useEffect } from 'react';
import ForgotPassword from '../../components/auth/ForgotPassword';

const ForgotPasswordPage: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);  // Khi trang load xong, bật hiệu ứng mượt mà
    }, []);

    return (
        <div
            className={`relative min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transition: 'all 0.7s ease' }}
        >
            {/* Lớp phủ gradient để làm mờ dần màu từ trái sang phải */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-white via-transparent"
                style={{
                    backgroundImage: `url('https://your-image-link-here.com/image.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            {/* Bố cục chính */}
            <div className="relative flex min-h-screen">
                {/* Phần bên trái: Component ForgotPassword */}
                <div className="w-2/5 flex justify-center items-center bg-white">
                    <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-white">
                        <ForgotPassword />
                    </div>
                </div>

                {/* Phần bên phải (ảnh nền hoặc màu nền) */}
                <div className="w-3/5"></div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
