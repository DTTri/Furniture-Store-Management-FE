import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/product/ProductPage";
import InventoryPage from "./pages/inventory/InventoryPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  );
}

export default App;
