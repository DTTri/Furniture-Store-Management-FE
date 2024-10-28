import ImportPopup from "../../components/inventoryPage/ImportPopup";
import ImportHistoryOrderPopup from "../../components/inventoryPage/ImportHistoryOrderPopup";
import { useEffect, useState } from "react";
import StockTable from "../../components/inventoryPage/StockTable";
import http from "../../api/http";
import { Product } from "../../entities";
import { Button } from "@mui/material";
export default function InventoryPage() {
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [isPopupImportHistoryOrder, setIsPopupImportHistoryOrder] =
    useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get("/products/get-all-products");
        //console.log(response);
        if (response.data.EC === 0) {
          setProducts(response.data.DT);
        } else {
          console.error("Failed to fetch products:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="container bg-white h-full">
      <div className="header w-full flex gap-4 p-4 pl-8">
        <Button
          variant="contained"
          onClick={() => setIsImportPopupOpen(true)}
          style={{
            textTransform: "none",
          }}
        >
          Import goods
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            console.log("importHistoryOrder");
            setIsPopupImportHistoryOrder(true);
          }}
          style={{
            textTransform: "none",
          }}
        >
          Import history order
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <StockTable products={products} />
      </div>

      {isImportPopupOpen && (
        <ImportPopup onClose={() => setIsImportPopupOpen(false)} />
      )}
      {isPopupImportHistoryOrder && (
        <ImportHistoryOrderPopup
          onClose={() => setIsPopupImportHistoryOrder(false)}
        />
      )}
    </div>
  );
}
