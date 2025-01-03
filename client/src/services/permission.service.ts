import http from "../api/http";
class PermissionService {
  baseUri = "/authorization";
  private getUri(uri: string) {
    return this.baseUri + uri;
  }

  async getAllPermissions() {
    return await http.get(this.getUri("/get-all-permissions"));
  }
  async getPermissionsByRole(roleId: number) {
    return await http.get(
      this.getUri("/permissions-by-role/" + roleId.toString())
    );
  }
  async updatePermissions(roleId: number, permissions: number[]) {
    return await http.put(this.getUri("/update-permissons/" + roleId), {
      permissions,
    });
  }
}
const permissionService = new PermissionService();
export default permissionService;
