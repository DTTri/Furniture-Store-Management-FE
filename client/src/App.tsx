import { Route, Routes } from "react-router-dom";
import {
  CategoryPage,
  CustomerPage,
  InventoryPage,
  InvoicePage,
  Layout,
  ProductPage,
  PromotionPage,
  ProviderPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/provider" element={<ProviderPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
      </Route>
      {/* <Route path="/login" element={<div>Login</div>} /> */}
    </Routes>
  );
}

export default App;
