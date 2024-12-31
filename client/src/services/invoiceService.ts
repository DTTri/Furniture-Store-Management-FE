import InvoiceDTO from "../entities/DTO/CreateInvoiceDTO";
import http from "../api/http";

class invoiceService {
  baseUri: string;
  constructor() {
    this.baseUri = "invoices";
  }
  private getURI(uri: string) {
    return `${this.baseUri}/${uri}`;
  }

  async getAllInvoice() {
    return http.get(this.getURI("get-all-invoices"));
  }
  async getInvoiceById(id: number) {
    return http.get(this.getURI(`get-invoice/${id}`));
  }
  async createInvoice(createInvoice: InvoiceDTO) {
    return http.post(this.getURI("create-invoice"), createInvoice);
  }
  async updateInvoice(id: number, updateInvoice: InvoiceDTO) {
    return http.put(this.getURI(`update-invoice/${id}`), updateInvoice);
  }
  async deleteInvoice(id: number) {
    return http.delete(this.getURI(`delete-catalogue/${id}`));
  }
  async acceptInvoice(id: number) {
    return http.put(this.getURI(`accept-invoice/${id}`), {});
  }
  async rejectInvoice(id: number) {
    return http.put(this.getURI(`reject-invoice/${id}`), {});
  }
}

export default new invoiceService();
