import http from "../api/http";
import AddProviderDTO from "../components/providerPage/AddProviderDTO";
class ProviderService {
  baseUri = "/providers";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllProviders() {
    return await http.get(this.getUri("/get-all-providers"));
  }
  async createProvider(provider: AddProviderDTO) {
    return await http.post(this.getUri("/create-provider"), provider);
  }
  async updateProvider(providerId: number, provider: AddProviderDTO) {
    return await http.put(
      this.getUri("/update-provider/" + providerId),
      provider
    );
  }
  async deleteProvider(providerId: number) {
    return await http.delete(this.getUri("/delete-provider/" + providerId));
  }
}
const providerService = new ProviderService();
export default providerService;
// import http from "../api/http";
// import AddCustomerDTO from "../components/customerPage/AddCustomerDTO";
// class CustomerService {
//   baseUri = "/customers";
//   private getUri(uri: string) {
//     return this.baseUri + uri;
//   }
//   async getAllCustomers() {
//     return await http.get(this.getUri("/get-all-customers"));
//   }
//   async createCustomer(customer: AddCustomerDTO) {
//     return await http.post(this.getUri("/create-customer"), customer);
//   }
//   async updateCustomer(customerId: string, customer: AddCustomerDTO) {
//     return await http.put(
//       this.getUri("/update-customer/" + customerId),
//       customer
//     );
//   }
//   async deleteCustomer(customerId: string) {
//     return await http.delete(this.getUri("/delete-customer/" + customerId));
//   }
// }
// const customerService = new CustomerService();
// export default customerService;
