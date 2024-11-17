import React, { useState, useEffect } from 'react';
import Login from '../../components/auth/Login';

const LoginPage: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);  // Khi trang load xong, bật hiệu ứng mượt mà
    }, []);

    return (
        <div
            className={`relative min-h-screen bg-blue-500 bg-cover bg-center transition-all duration-700 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transition: 'all 0.7s ease' }}
        >
            {/* Lớp phủ gradient từ trái sang phải */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent"></div>

            {/* Bố cục chính */}
            <div className="relative flex min-h-screen">
                {/* Phần bên trái (màu nền hoặc ảnh chiếm toàn màn hình) */}
                <div className="w-3/5"></div>

                {/* Phần bên phải: Component Login */}
                <div className="w-2/5 flex justify-center items-center bg-white">
                    <div className="w-full max-w-lg p-8 rounded-lg shadow-lg">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
