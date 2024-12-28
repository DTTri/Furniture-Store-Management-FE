import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Staff from "../../entities/Staff";

export default function ChangePasswordPopup({
  onClose,
  staff
}: {
  onClose: () => void;
  staff: Staff;
}) {
  const [oldPassword, setoldPassword] = useState("");
  const [showOldPassword, setshowOldPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [retypePassword, setRePassword] = useState("");
  const [showRePassword, setShowRePassword] = useState(false);

  const validateInputs = () => {
    if (!oldPassword || !password || !retypePassword) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (
      password === oldPassword
    ) {
      toast.error("No information has been changed");
      return false;
    }
    if (
      password !== retypePassword
    ) {
      toast.error("Retype password is not match");
      return false;
    }
    return true;
  };

  const handleUpdateStaff = async () => {
    if (!validateInputs()) {
      return;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
      <div className="flex flex-col gap-4">
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Old Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setoldPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showOldPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => setshowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>
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
              value={retypePassword}
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
        <div className="buttons-container w-full flex justify-end gap-2">
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              textTransform: "none",
            }}
            onClick={onClose}
            id="cancelAddStaffButton"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              textTransform: "none",
            }}
            onClick={handleUpdateStaff}
            id="confirmUpdateStaffButton"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
