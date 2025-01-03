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
  async acceptInvoice(id: number, paymentMethod: string) {
    return http.put(this.getURI(`accept-invoice/${id}`), { paymentMethod });
  }
  async rejectInvoice(id: number) {
    return http.put(this.getURI(`reject-invoice/${id}`), {});
  }
  async bankTransfer(id: number, paidAmount: number) {
    return http.post(`order-vnpay/create_payment_url`, {
      "invoiceId": id,
      "amount": paidAmount,
      "bankCode": "VNBANK",
      "language": "vn"
    });
  }
}

export default new invoiceService();
