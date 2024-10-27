import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/product/ProductPage";
import InventoryPage from "./pages/inventory/InventoryPage";
import Layout from "./pages/Layout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Route>
      {/* <Route path="/login" element={<div>Login</div>} /> */}
    </Routes>
  );
}

export default App;
