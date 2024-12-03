import http from "../api/http";
import AddProviderDTO from "../components/providerPage/AddProviderDTO";
class ReportService {
  baseUri = "/report";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getReprotByDate(fromDate: string, toDate: string) {
    return await http.get(this.getUri("/general?fromDate=" + fromDate + "&toDate=" + toDate));
  }
}

export default new ReportService();