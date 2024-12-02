import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import LoginImage from "../../assets/Login_image.png";

export default function LoginPage() {
  return (
    <div className="min-w-[600px] w-full h-screen flex flex-row bg-[#f0f0f0]">
      <div style={{ backgroundImage: `url(${LoginImage})` }} className="image w-[45%] bg-no-repeat bg-contain">
      </div>
      <div className="w-[50%] py-20 mx-auto ml-[-30px]">
        <LoginForm />
      </div>
    </div>
  );
}
