import GoodsReceipt from "../../entities/GoodsReceipt";
import GoodsReceiptDetail from "../../entities/GoodsReceiptDetail";
import Button from "@mui/material/Button";
import { useState } from "react";
import  { testGoodReceipt, testGoodsReceiptDetail } from "../../data/testGoodReceipt";
import  { productVariants } from "../../data/test";
import { ProductVaraint } from "../../entities";

export default function DoubleCheckedGoodsReceipt({
  onClose,
  goodReciptInfo,
  receipts,
}: {
  onClose: () => void;
  goodReciptInfo: {
    goodReceiptId: string;
    receiptDate: string;
    staffId: string;
    providerId: string;
    email: string,
    phone: string,
  };
  receipts: GoodsReceiptDetail[];
}) {
  const [importedProductVariantsDetails, setImportedProductVariantsDetails] =
    useState<ProductVaraint[]>(productVariants.filter((productVariant) => {
      return receipts.some((receipt) => receipt.variantId === productVariant.id);
    }));
  const [total, setTotal] =
    useState<number>(receipts.reduce((acc, receipt) => { acc += receipt.cost * receipt.quantity; return acc; }, 0));


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
            <p>Ngày lập phiếu: {}</p>
            <p>Mã lập phiếu: {}</p>
            <p>Mã nhà cung cấp: {}</p>
          </div>
          <div className="col-2 w-fit">
            <p>Mã người lập phiếu: {}</p>
            <p>Số điện thoại: {}</p>
            <p>Email: {}</p>
          </div>
        </div>
        <div className="w-full px-1 mb-[15px]">
          <table className="w-full">
            <thead>
              <tr>
              <th>STT</th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Đơn giá</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>
                <th>Chiết khấu</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((item, index: number) => {
                return (
                  <tr key={item.variantId}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{importedProductVariantsDetails[index].productId}</td>
                    <td className="text-center">Tên sản phẩm</td>
                    <td className="text-center">{item.cost}</td>
                    <td className="text-center">"Đơn vị"</td>
                    <td className="text-center">{item.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full px-4 flex flex-row mb-1">
          <div className="col-1 mr-[250px]">
            <p className="font-semibold text-[18px] text-nowrap">Thành tiền: {total}đ</p>
            <p className="font-semibold text-[18px] text-nowrap">Phương thức thanh toán: {}</p>
            <p className="font-semibold text-[18px] text-nowrap">Mã nhà cung cấp: {}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
