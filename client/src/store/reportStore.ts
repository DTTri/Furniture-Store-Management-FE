import { signify } from "react-signify";
import Report from "../entities/Report";
import StaffReport from "../entities/StaffReport";
import IncomeReport from "../entities/IncomeReport";

const sReport = signify({
  reportByDate: {} as Report,
  staffReport: [] as StaffReport[],
  incomeReport: [] as IncomeReport[],
});

export default sReport;
