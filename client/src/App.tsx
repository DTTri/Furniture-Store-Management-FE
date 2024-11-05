import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/product/ProductPage";
import InventoryPage from "./pages/inventory/InventoryPage";
import Layout from "./pages/Layout";
import ProviderPage from "./pages/provider/ProviderPage";
import CustomerPage from "./pages/customer/CustomerPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/provider" element={<ProviderPage />} />
        <Route path="/customer" element={<CustomerPage />} />
      </Route>
      {/* <Route path="/login" element={<div>Login</div>} /> */}
    </Routes>
  );
}

export default App;
