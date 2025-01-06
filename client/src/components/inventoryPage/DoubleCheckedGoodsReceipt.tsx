import GoodsReceipt from "../../entities/GoodsReceipt";
import GoodsReceiptDetail from "../../entities/GoodsReceiptDetail";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { goodsReceiptService } from "../../services";
import formatMoney from "../../utils/formatMoney";

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
        const response = await goodsReceiptService.getGoodsReceipt(
          goodsReceipt.id
        );
        console.log(response);
        if (response.data.EC === 0) {
          setReceiptDetails(response.data.DT.GoodsReceiptDetails);
          console.log("Fetched receipt details successfully");
        } else {
          console.error("Failed to fetch receipt details:", response);
        }
      } catch (error) {
        console.error("Error fetching receipt details:", error);
      }
    };
    fetchReceiptDetails();
  }, [goodsReceipt]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "STT",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        console.log(row);
        return row.ProductVariant.Product.name;
      },
    },
    {
      field: "variant",
      headerName: "Variant",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return `${row.ProductVariant.SKU} - ${row.ProductVariant.color} - ${row.ProductVariant.size}`;
      },
    },
    {
      field: "buyingPrice",
      headerName: "Buying Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.buyingPrice.toString());
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      headerAlign: "center",
      align: "center",
      valueGetter: (_, row) => {
        return formatMoney(row.cost.toString());
      },
    },
  ];
  const rows = receiptDetails.map((detail, index) => {
    return {
      ...detail,
      id: index + 1,
      buyingPrice: detail.cost / detail.quantity,
    };
  });

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup flex flex-col gap-4 bg-white relative rounded-xl p-4 w-2/3 h-[80vh] overflow-hidden">
        <button
          className="absolute flex flex-col items-center top-2 right-4 w-7 h-7 bg-black text-white rounded-full"
          onClick={onClose}
        >
          <span className="text-[16px] font-bold">x</span>
        </button>
        <div className="header w-full flex flex-row justify-between pl-4">
          <h3 className="font-semibold text-[28px] ">Goods Receipt</h3>
        </div>
        <div className="w-full px-8 flex gap-40 items-center mb-1 flex-wrap gap-y-2">
          <div className="">
            <p>Created Date: {goodsReceipt.receiptDate}</p>
            <p>Receipt ID: {goodsReceipt.id}</p>
          </div>
          {/* <hr className="w-[1px] h-16 bg-gray-500" /> */}
          <div className="">
            <p>Provider ID: {goodsReceipt.providerId}</p>
            <p>Staff ID: {goodsReceipt.staffId}</p>
          </div>
          {/* <hr className="w-[1px] h-16 bg-gray-500" /> */}
          <div className="">
            <p className="">
              Total Cost: {formatMoney(goodsReceipt.totalCost.toString())}
            </p>
            <p className="">
              Shipping: {formatMoney(goodsReceipt.shipping.toString())}
            </p>
          </div>
        </div>
        <div className="w-full h-full">
          <DataGrid
            style={{
              borderRadius: "20px",
              backgroundColor: "white",
              height: "100%",
            }}
            rows={rows}
            columns={columns}
            disableDensitySelector
            rowHeight={40}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4,
                },
              },
            }}
            pageSizeOptions={
              rows.length < 4 ? [4, rows.length] : [4, rows.length + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
        </div>
      </div>
    </div>
  );
}
