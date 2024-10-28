import GoodsReceipt from "../../entities/GoodsReceipt";
import GoodsReceiptDetail from "../../entities/GoodsReceiptDetail";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import http from "../../api/http";

export default function DoubleCheckedGoodsReceipt({
  onClose,
  goodsReceipt,
}: {
  onClose: () => void;
  goodsReceipt: GoodsReceipt;
}) {
  const [receiptDetails, setReceiptDetails] = useState<GoodsReceiptDetail[]>(
    []
  );
  useEffect(() => {
    const fetchReceiptDetails = async () => {
      try {
        const response = await http.get(
          "/get-goods-receipt/" + goodsReceipt.id
        );
        if (response.data.EC === 0) {
          setReceiptDetails(response.data.DT);
        } else {
          console.error("Failed to fetch receipt details:", response.data.EM);
        }
      } catch (error) {
        console.error("Error fetching receipt details:", error);
      }
    };
    fetchReceiptDetails();
  }, [goodsReceipt]);

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
        <div className="header w-full flex flex-row justify-between pl-4 pr-8 mt-[32px] mb-[24px]">
          <h3 className="font-semibold text-[28px] ">Phiếu nhập hàng</h3>
          <div className="buttons flex flex-row items-center gap-5">
            <Button style={{ background: "#D91316" }} variant="contained">
              Đóng
            </Button>
            <Button style={{ background: "#1366D9" }} variant="contained">
              Xác nhận lập phiếu
            </Button>
          </div>
        </div>
        <div className="w-full px-4 flex flex-row mb-[15px]">
          <div className="col-1 mr-[250px]">
            <p>Ngày lập phiếu: {goodsReceipt.receiptDate}</p>
            <p>Mã lập phiếu: {goodsReceipt.id}</p>
            <p>Mã nhà cung cấp: {goodsReceipt.providerId}</p>
          </div>
          <div className="col-2 w-fit">
            <p>Mã người lập phiếu: {goodsReceipt.staffId}</p>
          </div>
        </div>
        <div className="w-full px-1 mb-[15px]">
          <table className="w-full">
            <thead>
              <tr>
                <th>STT</th>
                <th>VariantID</th>
                <th>Buying Price</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {receiptDetails.map((item, index: number) => {
                return (
                  <tr key={item.variantId}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">item.variantId</td>
                    <td className="text-center">{item.cost / item.quantity}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{item.cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full px-4 flex flex-row mb-1">
          <div className="col-1 mr-[250px]">
            <p className="font-semibold text-[18px] text-nowrap">
              Thành tiền: {goodsReceipt.totalCost}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
