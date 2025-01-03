import { signify } from "react-signify";
import { Staff } from "../entities";

const sUser = signify({
  info: {} as Staff,
  token: "",
  permissions: [] as number[],
  role: -1,
});

export default sUser;
