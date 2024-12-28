import { signify } from "react-signify";
import { RepairOrder } from "../entities";

const sRepair = signify({
  repairs: [] as RepairOrder[],
});

export default sRepair;
