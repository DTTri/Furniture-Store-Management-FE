import React from 'react';
import LoginImage from "../../assets/Login_image.png";
import ForgotPassword from '../../components/auth/ForgotPassword';
const ForgotPasswordPage: React.FC = () => {
    return (  
      <div className="min-w-[600px] w-full h-screen flex flex-row bg-[#f0f0f0]">
      <div style={{ backgroundImage: `url(${LoginImage})` }} className="image w-[45%] bg-no-repeat bg-contain">
      </div>
      <div className="w-[50%] pt-[120px] mx-auto ml-[-30px]">
        <ForgotPassword />
      </div>
    </div>
    );
};

export default ForgotPasswordPage;
