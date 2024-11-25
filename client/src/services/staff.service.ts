import http from "../api/http";
class StaffService {
  baseUri = "/staffs";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }
  async getAllStaffs() {
    return await http.get(this.getUri("/get-all-staffs"));
  }
  async createStaff(staff: object) {
    return await http.post(this.getUri("/create-staff"), staff);
  }
  async updateStaff(staffId: number, staff: object) {
    return await http.put(this.getUri("/update-staff/" + staffId), staff);
  }
  async deleteStaff(staffId: number) {
    return await http.delete(this.getUri("/delete-staff/" + staffId));
  }
}
const staffService = new StaffService();
export default staffService;

////////////////////////////////////Staff////////////////////////////////////
//thêm nhân viên
// ###
// POST {{Web}}/staffs/create-staff
// Content-Type: application/json

// {
//     "fullname": "Nguyễn Văn A",
//     "birth": "1999-12-20",
//     "gender": "male",
//     "idNumber": "0123456789",
//     "startDate": "2020-08-30",
//     "phone": "0123456789",
//     "email": "nguyenvana@gmail.com",
//     "role": 3
// }

// ###
// PUT {{Web}}/staffs/update-staff/1
// Content-Type: application/json

// {
//     "fullname": "Nguyễn Văn B",
//     "birth": "1999-12-20",
//     "gender": "male",
//     "idNumber": "0123456789",
//     "startDate": "2020-08-30",
//     "phone": "0123456789",
//     "email": "nguyenvana@gmail.com"
// }

// ###
// GET {{Web}}/staffs/get-all-staffs

// ###
// GET {{Web}}/staffs/get-staff/1

// ###
// DELETE {{Web}}/staffs/delete-staff/1

// class ProviderService {
//     baseUri = "/providers";
//     private getUri(uri: string) {
//       return this.baseUri + uri;
//     }
//     async getAllProviders() {
//       return await http.get(this.getUri("/get-all-providers"));
//     }
//     async createProvider(provider: AddProviderDTO) {
//       return await http.post(this.getUri("/create-provider"), provider);
//     }
//     async updateProvider(providerId: number, provider: AddProviderDTO) {
//       return await http.put(
//         this.getUri("/update-provider/" + providerId),
//         provider
//       );
//     }
//     async deleteProvider(providerId: number) {
//       return await http.delete(this.getUri("/delete-provider/" + providerId));
//     }
//   }
//   const providerService = new ProviderService();
//   export default providerService;
