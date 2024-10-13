import { BillStatus } from "../constants";

type Bill = {
  id: string;
  totalCost: number;
  date: string;
  status: BillStatus;
  customerId: string;
  staffId: string;
};

export default Bill;
