import ImportPopup from "../../components/inventoryPage/ImportPopup";
import ImportHistoryOrderPopup from "../../components/inventoryPage/ImportHistoryOrderPopup";
import { useState } from "react";
import StockTable from "../../components/inventoryPage/StockTable";
import { Button } from "@mui/material";
import { sProduct, sUser } from "../../store";
export default function InventoryPage() {
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [isPopupImportHistoryOrder, setIsPopupImportHistoryOrder] =
    useState(false);
  const products = sProduct.use((v) => v.products);
  const userPermissions = sUser.use((v) => v.permissions);
  return (
    <div className="container bg-white h-full p-4 flex flex-col gap-4">
      <div className="header flex flex-row justify-between items-center px-4">
        <h2 className="page-header">Inventory</h2>
        <div className="flex gap-4">
          {userPermissions.includes(17) && (
            <Button
              variant="contained"
              onClick={() => setIsImportPopupOpen(true)}
              style={{
                textTransform: "none",
              }}
              id="openImportPopupButton"
            >
              Import goods
            </Button>
          )}
          {userPermissions.includes(18) && (
            <Button
              variant="contained"
              onClick={() => {
                console.log("importHistoryOrder");
                setIsPopupImportHistoryOrder(true);
              }}
              style={{
                textTransform: "none",
              }}
              id="openImportHistoryOrderPopupButton"
            >
              Import history order
            </Button>
          )}
        </div>
      </div>
      <div className="table-container w-full">
        {userPermissions.includes(8) && <StockTable products={products} />}
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
