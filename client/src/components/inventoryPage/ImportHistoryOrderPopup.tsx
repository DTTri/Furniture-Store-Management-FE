import GoodsReceipt from "../../entities/GoodsReceipt";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function ImprortHistoryOrderPopup({
  onClose,
  receipts,
}: {
  onClose: () => void;
  receipts: GoodsReceipt[];
}) {
  const [importedGoodReceipts, setImportedGoodReceipts] =
    useState<GoodsReceipt[]>(receipts);

  // const handleAddProductToImport = (product: Product, quantity: number) => {
  // };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="header bg-white gap-4 relative rounded-xl p-4 w-2/3 max-h-[80vh] overflow-hidden">
        <button
          className="absolute flex flex-col items-center top-2 right-4 w-7 h-7 bg-black text-white rounded-full"
          onClick={onClose}
        >
          <span className="text-[16px] font-bold">x</span>
        </button>
        <div className="header w-full flex flex-row justify-between pl-4 pr-8 mt-[32px] mb-5">
          <h3 className="font-semibold text-[28px] ">Lịch sử nhập hàng</h3>
          <div className="buttons flex flex-row items-center gap-5">
            <Button style={{ background: "#D91316" }} variant="contained">
              Đóng
            </Button>
            <Button
              style={{ fontSize: 14 }}
              variant="outlined"
              href="#outlined-buttons"
            >
              Chọn
            </Button>
          </div>
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
              {importedGoodReceipts.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">{item.receiptDate}</td>
                  <td className="text-center">{item.staffId}</td>
                  <td className="text-center">{item.providerId}</td>
                  <td className="text-center">{item.totalCost}</td>
                  <td className="text-center">
                    <button className="w-8 h-8 border-2">i</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
