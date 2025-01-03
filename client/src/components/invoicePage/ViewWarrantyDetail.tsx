import { useEffect, useState } from "react";
import Invoice from "../../entities/Invoice";
import { sWarranty } from "../../store";
import LoadingProgress from "../LoadingProgress";
import formatDate from "../../utils/formatDate";

export default function ViewWarrantyDetail({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  const warrantyList = sWarranty.use((s) => s.warranties);
  const [warrantyListInInvoice, setWarrantyListInInvoice] = useState<any[]>([]);

  useEffect(() => {
    setWarrantyListInInvoice(() => {
      let warrantyTemp: any[] = [];
      invoice.InvoiceDetails.forEach((detail) => {
        const warranty = warrantyList.find((w) => w.id === detail.id);
        if (warranty)
          warrantyTemp.push({
            ...warranty,
            quantity: detail.quantity,
            productVariant: detail.ProductVariant,
          });
      });
      return warrantyTemp;
    });
  }, [warrantyList]);

  if (!warrantyList) {
    return <LoadingProgress />;
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="popup bg-white rounded-xl p-4 max-w-[400px] w-full max-h-[750px] overflow-auto relative">
          <button
            className="absolute flex flex-col items-center top-2 right-4 w-7 h-7 bg-black text-white rounded-full"
            onClick={onClose}
          >
            <span className="text-[16px] font-bold">x</span>
          </button>
          {warrantyListInInvoice.map((warranty) => (
            <div
              key={warranty.id}
              className="grid grid-cols-2 grid-rows-3  border-b border-gray-400 py-2"
            >
              <div className="text-sm font-medium text-black">
                Warranty Id: {warranty.id}
              </div>
              <div className="text-sm font-medium text-black">
                Customer Id: {warranty.customerId}
              </div>
              <div className="text-sm font-medium text-black">
                SKU: {warranty.productVariant.SKU}
              </div>
              <div className="text-sm font-medium text-black">
                Quantity: {warranty.quantity}
              </div>

              <div className="text-sm font-medium text-black">
                Start Date: {formatDate(warranty.startDate)}
              </div>
              <div className="text-sm font-medium text-black">
                End Date: {formatDate(warranty.endDate)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
