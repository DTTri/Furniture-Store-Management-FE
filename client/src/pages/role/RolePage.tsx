import { useEffect, useState } from "react";
import { Permission } from "../../entities";
import { sPermission } from "../../store";
import { permissionService } from "../../services";
import { Button } from "@mui/material";

export default function RolePage() {
  const [isConfirmUpdatePopupOpen, setIsConfirmUpdatePopupOpen] =
    useState(false);
  const [role, setRole] = useState(1);
  const permissions: Permission[] = sPermission.use((v) => v.permissions);
  const [userPermissions, setUserPermissions] = useState<number[]>([]);
  const [updatedPermissions, setUpdatedPermissions] = useState<number[]>([]);
  useEffect(() => {
    const fetchUserPermissions = async () => {
      console.log(role);
      try {
        const res = await permissionService.getPermissionsByRole(role);
        if (res.data.EC === 0) {
          setUserPermissions(res.data.DT);
          setUpdatedPermissions(res.data.DT);
          console.log(res.data.DT);
        } else {
          console.log(res.data.EM);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPermissions();
  }, [role]);

  const handleUpdatePermissions = async () => {
    try {
      const res = await permissionService.updatePermissions(
        role,
        updatedPermissions
      );
      if (res.data.EC === 0) {
        console.log(res.data.DT);
      } else {
        console.log(res.data.EM);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="page w-full h-full p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-gray-800">Role Management</h2>
      <div className="flex items-center justify-between">
        <div>
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(parseInt(e.target.value));
            }}
            className="border border-gray-300 rounded-md p-1 ml-2"
          >
            <option value={2}>Manager</option>
            <option value={3}>Sale Staff</option>
            <option value={4}>Inventory Staff</option>
            <option value={5}>Repair Staff</option>
          </select>
        </div>
        <div className="buttons-container flex justify-center gap-2">
          {/* Reset button and Update button, Update button just can be clicked when updatedPermissions is different from userPermissions */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setUpdatedPermissions(userPermissions);
            }}
            style={{
              backgroundColor: "red",
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsConfirmUpdatePopupOpen(true);
            }}
            disabled={
              JSON.stringify(updatedPermissions) ===
              JSON.stringify(userPermissions)
            }
            style={{
              backgroundColor:
                JSON.stringify(updatedPermissions) ===
                JSON.stringify(userPermissions)
                  ? "#ccc"
                  : "green",
            }}
          >
            Update
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 h-[420px] max-h-full overflow-y-auto">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center">
            <input
              type="checkbox"
              checked={updatedPermissions.some((p) => p === permission.id)}
              className="mr-2"
              onChange={(e) => {
                if (e.target.checked) {
                  setUpdatedPermissions([...updatedPermissions, permission.id]);
                } else {
                  setUpdatedPermissions(
                    updatedPermissions.filter((p) => p !== permission.id)
                  );
                }
              }}
              id={`permission-${permission.id}`}
            />
            <label
              className="text-gray-800"
              htmlFor={`permission-${permission.id}`}
            >
              {permission.name}
            </label>
          </div>
        ))}
      </div>
      {isConfirmUpdatePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Are you sure you want to update permissions?
            </h2>
            <div className="flex justify-center gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsConfirmUpdatePopupOpen(false);
                }}
                style={{
                  backgroundColor: "red",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleUpdatePermissions();
                  setIsConfirmUpdatePopupOpen(false);
                }}
                style={{
                  backgroundColor: "green",
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
