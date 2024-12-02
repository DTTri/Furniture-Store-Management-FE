import { useEffect, useState } from "react";
import { Permission } from "../../entities";
import { sPermission } from "../../store";
import { permissionService } from "../../services";
// type Permission = {
//     id: number;
//     name: string;
//   };
export default function RolePage() {
  const [role, setRole] = useState(1);
  const permissions: Permission[] = sPermission.use((v) => v.permissions);
  const [userPermissions, setUserPermissions] = useState<number[]>([]);
  useEffect(() => {
    const fetchUserPermissions = async () => {
      try {
        const res = await permissionService.getPermissionsByRole(role);
        if (res.data.EC === 0) {
          setUserPermissions(res.data.DT);
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
  return (
    <div className="page w-full h-full p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-gray-800">Role Management</h2>
      {/* Combo box for select role (4 role) */}
      <div className="flex items-center">
        <label>Role</label>
        <select
          value={role}
          onChange={(e) => {
            setRole(Number(e.target.value));
          }}
          className="border border-gray-300 rounded-md p-1 ml-2"
        >
          <option value={1}>Role 1</option>
          <option value={2}>Role 2</option>
          <option value={3}>Role 3</option>
          <option value={4}>Role 4</option>
        </select>
      </div>
      {/* checkboxes for each permission, checked if user has that permission */}
      <div className="grid grid-cols-4 gap-4 max-h-[500px] overflow-y-auto">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={userPermissions.some((p) => p === permission.id)}
              className="mr-2"
              onChange={(e) => {
                if (e.target.checked) {
                  setUserPermissions([...userPermissions, permission.id]);
                } else {
                  setUserPermissions(
                    userPermissions.filter((p) => p !== permission.id)
                  );
                }
              }}
            />
            <label>{permission.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
