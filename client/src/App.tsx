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

function App() {
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
      </Route>
    </Routes>
  );
}

export default App;
