import ImportPopup from "../../components/inventoryPage/ImportPopup";
import ImportHistoryOrderPopup from "../../components/inventoryPage/ImportHistoryOrderPopup";
import DoubleCheckedGoodsReceipt from "../../components/inventoryPage/DoubleCheckedGoodsReceipt";
import { useState } from "react";
import {
  testGoodReceipt,
  testGoodsReceiptDetail,
} from "../../data/testGoodReceipt";
import { products, productVariants } from "../../data/test";
import StockTable from "../../components/inventoryPage/StockTable";
export default function InventoryPage() {
  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [isPopupImportHistoryOrder, setIsPopupImportHistoryOrder] =
    useState(false);
  const [isDoubleCheckedGoodReceipt, setIsDoubleCheckedGoodReceipt] =
    useState(false);
  return (
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
        <DoubleCheckedGoodsReceipt
          onClose={() => setIsDoubleCheckedGoodReceipt(false)}
          goodReciptInfo={{
            goodReceiptId: "GR001",
            receiptDate: "2021-10-10",
            staffId: "ST001",
            providerId: "PR001",
            email: "thinh@gmail.com",
            phone: "0123456789",
          }}
          receipts={testGoodsReceiptDetail}
        />
      )}
    </div>
  );
}
