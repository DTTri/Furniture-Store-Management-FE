import { signify } from "react-signify";
import { Permission } from "../entities";

const sPermission = signify({
  permissions: [] as Permission[],
  userPermissions: [] as Permission[],
});

export default sPermission;
