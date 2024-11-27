import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Để điều hướng
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Icon mũi tên quay lại
import { TextField } from "@mui/material";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  const handleGoBack = () => {
    navigate("/login"); // Điều hướng về trang login
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div
      className={`duration-700 max-w-[420px] w-full bg-white shadow-xl ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      } px-9 py-11 flex flex-col mx-auto rounded-xl transform transition duration-500 hover:scale-105`}
      style={{ transition: "all 0.7s ease" }}
    >
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 bg-transparent p-2 rounded-full text-blue-500 hover:bg-gray-100 transition-colors"
      >
        <ArrowBackIcon />
      </button>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Change Password
      </h2>
      <form>
        {email === "" || email.match(emailRegex) ? (
          <TextField
            value={email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            color="info"
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "Nunito Sans",
            }}
            id="email-outlined"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
          />
        ) : (
          <TextField
            value={email}
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            error
            color="info"
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "Nunito Sans",
            }}
            id="email-outlined"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            helperText="Example@gmail.com"
          />
        )}
        <button
          type="submit"
          className="w-full font-semibold bg-blue-500 text-white py-2 px-4 rounded-md mt-3"
        >
          Send verification 
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
