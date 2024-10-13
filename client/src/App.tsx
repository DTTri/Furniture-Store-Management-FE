import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/product/ProductPage";
import InventoryPage from "./pages/inventory/InventoryPage";
import BillPage from "./pages/bill/BillPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/bill" element={<BillPage />} />
    </Routes>
  );
}

export default App;
