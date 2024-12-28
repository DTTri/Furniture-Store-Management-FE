import http from "../api/http";
class ReportService {
  baseUri = "/report";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getReprotByDate(fromDate: string, toDate: string) {
    return await http.get(
      this.getUri("/general?fromDate=" + fromDate + "&toDate=" + toDate)
    );
  }
  async getStaffReprotByDate(fromDate: string, toDate: string) {
    return await http.get(
      this.getUri("/staff?fromDate=" + fromDate + "&toDate=" + toDate)
    );
  }
  async getIncomeReprotByDate(fromDate: string, toDate: string) {
    return await http.get(
      this.getUri("/income?fromDate=" + fromDate + "&toDate=" + toDate)
    );
  }
}

export default new ReportService();
