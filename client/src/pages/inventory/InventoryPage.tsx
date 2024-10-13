import ImportPopup from "../../components/inventoryPage/ImportPopup";
import ImportHistoryOrderPopup from "../../components/inventoryPage/ImportHistoryOrderPopup";
import DoubleCheckedGoodReceipt from "../../components/inventoryPage/DoubleCheckedGoodReceipt";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import testGoodReceipt from "../../data/testGoodReceipt";
import { products, productVariants } from "../../data/test";
import StockTable from "../../components/inventoryPage/StockTable";
export default function InventoryPage() {
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [isPopupImportHistoryOrder, setIsPopupImportHistoryOrder] =
    useState(false);
  const [isDoubleCheckedGoodReceipt, setIsDoubleCheckedGoodReceipt] =
    useState(false);
  return (
    <div className="flex gap-8 bg-gray-100">
      <NavBar />
      <div className="container bg-white mb-8">
        <div className="header w-full flex gap-4 p-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="border border-gray-300 rounded-md p-1 w-1/4"
          />
          <button
            onClick={() => setIsImportPopupOpen(true)}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Nhập hàng
          </button>
          <button
            onClick={() => setIsImportPopupOpen(true)}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Lịch sử nhập hàng
          </button>
          <button
            onClick={() => {
              console.log("importHistoryOrder");
              setIsPopupImportHistoryOrder(true);
            }}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Lịch sử nhập hàng
          </button>
          <button
            onClick={() => {
              setIsDoubleCheckedGoodReceipt(true);
            }}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Nhập hàng check lần 2
          </button>
        </div>
        <div className="table-container w-full px-8 py-4">
          <StockTable products={products} />
        </div>
      </div>
      {isImportPopupOpen && (
        <ImportPopup
          onClose={() => setIsImportPopupOpen(false)}
          productVariants={productVariants}
          products={products}
        />
      )}
      {isPopupImportHistoryOrder && (
        <ImportHistoryOrderPopup
          onClose={() => setIsPopupImportHistoryOrder(false)}
          receipts={testGoodReceipt}
        />
      )}
      {isDoubleCheckedGoodReceipt && (
        <DoubleCheckedGoodReceipt
          onClose={() => setIsDoubleCheckedGoodReceipt(false)}
          receipts={testGoodReceipt}
        />
      )}
    </div>
  );
}
