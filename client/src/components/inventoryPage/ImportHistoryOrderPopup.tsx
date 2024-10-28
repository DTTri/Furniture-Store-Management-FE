import GoodsReceipt from "../../entities/GoodsReceipt";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import DoubleCheckedGoodsReceipt from "./DoubleCheckedGoodsReceipt";
import http from "../../api/http";

export default function ImprortHistoryOrderPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [receipts, setReceipts] = useState<GoodsReceipt[]>([]);
  useEffect(() => {
    const fetchGoodsReceipts = async () => {
      try {
        const response = await http.get(
          "/goods-receipt/get-all-goods-receipts"
        );
        if (response.data.EC === 0) {
          setReceipts(response.data.DT);
        } else {
          console.error("Failed to fetch goods receipts:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching goods receipts:", error);
      }
    };
    fetchGoodsReceipts();
  }, []);

  const [selectedGoodReceipt, setSelectedGoodReceipt] =
    useState<GoodsReceipt | null>(receipts[0]);
  // const handleAddProductToImport = (product: Product, quantity: number) => {
  // };

  const [
    isDoubleCheckedGoodReceiptPopupOpen,
    setIsDoubleCheckedGoodReceiptPopupOpen,
  ] = useState(false);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="header bg-white gap-4 relative rounded-xl p-4 w-2/3 max-h-[80vh] overflow-hidden">
        <button
          className="absolute flex flex-col items-center top-2 right-4 w-7 h-7 bg-black text-white rounded-full"
          onClick={onClose}
        >
          <span className="text-[16px] font-bold">x</span>
        </button>
        <div className="header w-full flex flex-row justify-between pl-4 mb-5">
          <h3 className="font-semibold text-[28px] ">Lịch sử nhập hàng</h3>
        </div>
        <div className="w-full px-1 ">
          <table className="w-full">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã phiếu nhập hàng</th>
                <th>Ngày lập phiếu</th>
                <th>Người lập phiếu</th>
                <th>Mã nhà cung cấp</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">{item.receiptDate}</td>
                  <td className="text-center">{item.staffId}</td>
                  <td className="text-center">{item.providerId}</td>
                  <td className="text-center">{item.totalCost}</td>
                  <td className="text-center">
                    <button
                      className="w-8 h-8 border-2"
                      onClick={() => {
                        setSelectedGoodReceipt(item);
                        setIsDoubleCheckedGoodReceiptPopupOpen(true);
                      }}
                    >
                      i
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isDoubleCheckedGoodReceiptPopupOpen && selectedGoodReceipt && (
          <DoubleCheckedGoodsReceipt
            onClose={() => setIsDoubleCheckedGoodReceiptPopupOpen(false)}
            goodsReceipt={selectedGoodReceipt}
          />
        )}
      </div>
    </div>
  );
}
