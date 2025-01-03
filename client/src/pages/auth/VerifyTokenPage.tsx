import React from "react";
import LoginImage from "../../assets/Login_image.png";
import VerifyTokenForm from "../../components/auth/VerifyTokenForm";
import { Navigate } from "react-router-dom";
import { sUser } from "../../store";

const VerifyTokenPage: React.FC = () => {
  const userInfo = sUser.use(cur => cur.info);

  if(userInfo && userInfo.id){
    return <Navigate to={"/"} />
  }

  
  return (
    <div className="min-w-[600px] w-full h-screen flex flex-row bg-[#f0f0f0]">
      <div
        style={{ backgroundImage: `url(${LoginImage})` }}
        className="image w-[45%] bg-no-repeat bg-contain"
      ></div>
      <div className="w-[60%] py-32 mx-auto">
        <VerifyTokenForm />
      </div>
    </div>
  );
};

export default VerifyTokenPage;
