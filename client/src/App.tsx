import { Route, Routes } from "react-router-dom";
import {
  CategoryPage,
  CustomerPage,
  DashboardPage,
  InventoryPage,
  InvoicePage,
  Layout,
  ProductPage,
  PromotionPage,
  ProviderPage,
  RepairPage,
  ReportPage,
  StaffPage,
  WarrantyPage,
} from "./pages";

import LoginPage from "./pages/auth/LoginPage";
import UserProtect from "./pages/UserProtect";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import RolePage from "./pages/role/RolePage";
import { useEffect } from "react";
import { permissionService } from "./services";
import { sPermission, sUser } from "./store";

function App() {
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await permissionService.getAllPermissions();
        console.log(res);
        if (res.data.EC === 0) {
          sPermission.set((v) => (v.value.permissions = res.data.DT));
        } else {
          console.error("Failed to fetch permissions:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };
    fetchPermissions();
  }, []);

  return (
    <Routes>
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/"
        element={
          <UserProtect>
            <Layout />
          </UserProtect>
        }
      >
        <Route path="/" element={<DashboardPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/provider" element={<ProviderPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/repair" element={<RepairPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/role" element={<RolePage />} />
      </Route>
    </Routes>
  );
}

export default App;
