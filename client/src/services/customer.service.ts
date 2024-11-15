import http from "../api/http";
import AddCustomerDTO from "../components/customerPage/AddCustomerDTO";
class CustomerService {
  baseUri = "/customers";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllCustomers() {
    return await http.get(this.getUri("/get-all-customers"));
  }
  async createCustomer(customer: AddCustomerDTO) {
    return await http.post(this.getUri("/create-customer"), customer);
  }
  async updateCustomer(customerId: number, customer: AddCustomerDTO) {
    return await http.put(
      this.getUri("/update-customer/" + customerId),
      customer
    );
  }
  async deleteCustomer(customerId: number) {
    return await http.delete(this.getUri("/delete-customer/" + customerId));
  }
}
const customerService = new CustomerService();
export default customerService;
