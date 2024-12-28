import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import authenService from "../../services/authen.service";
import LoadingProgress from "../LoadingProgress";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, _setError] = useState("");
  const [isSuccess, _setIsSuccess] = useState(false);
  const { token } = useParams();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Khi trang load xong, bật hiệu ứng mượt mà
  }, []);

  const nav = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    if (password !== rePassword) {
      setLoading(false);
      return;
    }
    if (password === "" || rePassword === "") {
      toast("Password does not match", {
        type: "error",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await authenService.resetPassword({
        token: token,
        newPassword: password,
        retypeNewPassword: rePassword,
      });
      if (response.EC === 0) {
          toast('Password reset successfully, please log in again', {
            type: "success",
          });
        nav("/login");
      } else {
        toast("Fail to reset password", {
          type: "error",
        });
      }
    } catch (error) {
      toast("Fail to reset password", {
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div
      className={`duration-700 max-w-[420px] w-full bg-white shadow-xl ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      } px-9 py-11 flex flex-col mx-auto rounded-xl`}
    >
      <div className="  bg-transparent bg-white rounded-[24px]  ">
        <h2 className="text-[#000] text-xl font-bold mb-4">
          Verify successfully, please set your new password
        </h2>
        <div className="flex flex-col gap-4">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Retype Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showRePassword ? "text" : "password"}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => setShowRePassword(!showRePassword)}
                    edge="end"
                  >
                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Retype Password"
            />
          </FormControl>
        </div>
        <Button
          onClick={handleResetPassword}
          variant="outlined"
          style={{
            backgroundColor: "#1266da",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "4px",
            padding: "8px 0",
            width: "100%",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          RESET
        </Button>
        {isSuccess ? (
          <p className="text-green-600 text-center mt-2">
            Password reset successfully, please log in again
          </p>
        ) : (
          error && <p className="text-red-600 text-center mt-2">{error}</p>
        )}
        {loading && <LoadingProgress />}
      </div>
    </div>
  );
}
