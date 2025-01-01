import { signify } from "react-signify";
import { Staff } from "../entities";

const sUser = signify({
  info: {} as Staff,
  token: "",
});

export default sUser;
