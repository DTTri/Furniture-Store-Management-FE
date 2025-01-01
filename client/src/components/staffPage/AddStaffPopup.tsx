import { Button } from "@mui/material";
import { useState } from "react";
import AddStaffDTO from "./AddStaffDTO";
import UpdateStaffDTO from "./UpdateStaffDTO";
import Staff from "../../entities/Staff";
import staffService from "../../services/staff.service";
import { toast } from "react-toastify";
import formatDate from "../../utils/formatDate";

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
  const [role, setRole] = useState(2);

  const validateInputs = () => {
    if (!fullname || !birth || !idNumber || !startDate || !phone || !email) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (/^\s|\s{2,}|\s$/.test(fullname)) {
      toast("Name cannot contain leading/trailing spaces or multiple spaces", {
        type: "error",
      });
      return false;
    }
    if (
      !/^\d{10}$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast.error("Invalid phone or email");
      return false;
    }
    return true;
  };

  const handleAddStaff = async () => {
    if (!validateInputs()) {
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
        toast.success("Staff created successfully");
        onStaffCreated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to add staff: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to add staff");
      console.error("Error adding staff:", error);
    }
  };

  const handleUpdateStaff = async () => {
    if (!validateInputs() || !staff) {
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
        toast.success("Staff updated successfully");
        onStaffUpdated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to update staff: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to update staff");
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
              required
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              defaultValue={birth}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="gender">Gender</label>
            <select
              id="newStaffGenderInput"
              name="gender"
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                required
                onChange={(e) => {
                  setRole(Number(e.target.value));
                }}
                defaultValue={role}
              >
                <option value={2}>Manager</option>
                <option value={3}>Sale Staff</option>
                <option value={4}>Inventory Staff</option>
                <option value={5}>Repair Staff</option>
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
