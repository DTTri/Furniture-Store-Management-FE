import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginDTO from "../../entities/DTO/LoginDTO";
import authenService from "../../services/authen.service";
import { sUser } from "../../store";
import LoadingProgress from "../LoadingProgress";
import { permissionService } from "../../services";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Khi trang load xong, bật hiệu ứng mượt mà
  }, []);

  const nav = useNavigate();
  const fetchUserPermissions = async (role: number) => {
    try {
      const res = await permissionService.getPermissionsByRole(role);
      if (res.data.EC === 0) {
        sUser.set((v) => (v.value.permissions = res.data.DT));
      } else {
        console.error("Failed to fetch user permissions:", res.data.EM);
      }
    } catch (error) {
      console.error("Error fetching user permissions:", error);
    }
  };
  const handleOnLogin = async () => {
    setLoading(true);
    try {
      const loginDto: LoginDTO = {
        username: username,
        password: password,
      };
      const response = await authenService.login(loginDto);
      console.log("Login response:", response);
      if (response.data.EC === 0) {
        fetchUserPermissions(response.data.DT.role);
        if (rememberMe) {
          localStorage.setItem("token", response.data.DT.token);
          localStorage.setItem("id", response.data.DT.staff.id);
        } else {
          sessionStorage.setItem("token", response.data.DT.token);
          sessionStorage.setItem("id", response.data.DT.staff.id);
        }
        sUser.set((prev) => (prev.value.token = response.data.DT.token));
        sUser.set((prev) => (prev.value.info = response.data.DT.staff));
        sUser.set((prev) => (prev.value.role = response.data.DT.role));
        setLoading(false);
        nav("/");
      } else {
        toast.error("Failed to login: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to login!: " + error);
    }
    setLoading(false);
  };

  return (
    <div
      className={`duration-700 max-w-[420px] w-full bg-white shadow-xl ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      } px-9 py-11 flex flex-col mx-auto rounded-3xl transform transition duration-500`}
      style={{ transition: "all 0.7s ease" }}
    >
      <div className="  bg-transparent bg-white rounded-[24px]  ">
        <h3 className="text-[#000] text-sm font-medium">WELCOME BACK</h3>
        <h2 className="text-[#000] text-2xl font-bold mb-5">
          Sign In to your Account
        </h2>
        <div className="flex flex-col gap-5">
          <TextField
            value={username}
            onChange={(e) => {
              console.log(e.target.value);
              setUsername(e.target.value);
            }}
            color="info"
            style={{
              width: "100%",
              fontSize: "16px",
              fontFamily: "Nunito Sans",
            }}
            id="email-outlined"
            label="Username"
            type="text"
            variant="outlined"
            size="medium"
          />
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
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-3 mb-3">
          <div className="flex flex-row gap-2 items-center">
            <input
              onChange={(e) => {
                setRememberMe(e.target.checked);
              }}
              checked={rememberMe}
              type="checkbox"
              name="remember"
              id="remember"
              className="w-[15px] h-[15px]"
            />
            <label
              htmlFor="remember"
              className="text-[#000] text-[16px] font-normal"
            >
              Remember me
            </label>
          </div>
        </div>
        <Button
          onClick={handleOnLogin}
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
          }}
        >
          Sign in
        </Button>
        <div className="w-full flex flex-row justify-center mt-4">
          <Link
            to="/forgot-password"
            className="text-[#1570EF] text-sm font-semibold hover:text-zinc-400"
          >
            Forgot Password?
          </Link>
        </div>
        {loading && <LoadingProgress />}
      </div>
    </div>
  );
}
