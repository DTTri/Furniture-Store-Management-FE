import { Button } from "@mui/material";
import { useState } from "react";
import AddStaffDTO from "./AddStaffDTO";
import UpdateStaffDTO from "./UpdateStaffDTO";
import Staff from "../../entities/Staff";
import staffService from "../../services/staff.service";

export default function AddStaffPopup({
  onClose,
  onStaffCreated,
  staff,
  onStaffUpdated,
}: {
  onClose: () => void;
  onStaffCreated: (staff: Staff) => void;
  staff?: Staff;
  onStaffUpdated: (staff: Staff) => void;
}) {
  const [fullname, setFullname] = useState(staff?.fullname || "");
  const [birth, setBirth] = useState(staff?.birth || "");
  const [gender, setGender] = useState(staff?.gender || "Male");
  const [idNumber, setIdNumber] = useState(staff?.idNumber || "");
  const [startDate, setStartDate] = useState(staff?.startDate || "");
  const [phone, setPhone] = useState(staff?.phone || "");
  const [email, setEmail] = useState(staff?.email || "");
  const [role, setRole] = useState(1);

  const validateInputs = () => {
    if (!fullname || !birth || !idNumber || !startDate || !phone || !email) {
      return false;
    }
    return true;
  };

  const handleAddStaff = async () => {
    if (!validateInputs()) {
      alert("Invalid input");
      return;
    }
    try {
      const newStaff: AddStaffDTO = {
        fullname,
        birth: birth.split("/").reverse().join("-"),
        gender: gender.toLocaleLowerCase(),
        idNumber,
        startDate: startDate.split("/").reverse().join("-"),
        phone,
        email,
        role,
      };
      console.log(newStaff);
      const response = await staffService.createStaff(newStaff);
      if (response.data.EC === 0) {
        onStaffCreated(response.data.DT);
        onClose();
      } else {
        alert(response.data.EM);
      }
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };

  const handleUpdateStaff = async () => {
    if (!validateInputs() || !staff) {
      alert("Invalid input or staff not found");
      return;
    }
    try {
      const updatedStaff: UpdateStaffDTO = {
        fullname,
        birth: birth.split("/").reverse().join("-"),
        gender: gender.toLocaleLowerCase(),
        idNumber,
        startDate: startDate.split("/").reverse().join("-"),
        phone,
        email,
      };
      const response = await staffService.updateStaff(staff.id, updatedStaff);
      console.log(response);
      if (response.data.EC === 0) {
        onStaffUpdated(response.data.DT);
        onClose();
      } else {
        alert(response.data.EM);
      }
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullname">Full Name</label>
            <input
              id="newStaffFullnameInput"
              name="fullname"
              placeholder="Full Name"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              defaultValue={staff?.fullname}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birth">Birth</label>
            <input
              id="newStaffBirthInput"
              name="birth"
              type="date"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              defaultValue={staff?.birth}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <select
              id="newStaffGenderInput"
              name="gender"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setGender(e.target.value);
              }}
              defaultValue={staff?.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="idNumber">ID Number</label>
            <input
              id="newStaffIdNumberInput"
              name="idNumber"
              placeholder="ID Number"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setIdNumber(e.target.value);
              }}
              defaultValue={staff?.idNumber}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="newStaffStartDateInput"
              name="startDate"
              type="date"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              defaultValue={staff?.startDate}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="newStaffPhoneInput"
              name="phone"
              placeholder="Phone"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              defaultValue={staff?.phone}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="newStaffEmailInput"
              name="email"
              placeholder="Email"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              defaultValue={staff?.email}
            />
          </div>
          {!staff && (
            <div className="flex flex-col gap-2">
              <label htmlFor="role">Role</label>
              <select
                id="newStaffRoleInput"
                name="role"
                className="border border-gray-300 px-2 py-1 rounded-md"
                required
                onChange={(e) => {
                  setRole(Number(e.target.value));
                }}
                defaultValue={role}
              >
                <option value={1}>Role 1</option>
                <option value={2}>Role 2</option>
                <option value={3}>Role 3</option>
                <option value={4}>Role 4</option>
              </select>
            </div>
          )}
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
          {staff ? (
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
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddStaff}
              id="confirmAddStaffButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
