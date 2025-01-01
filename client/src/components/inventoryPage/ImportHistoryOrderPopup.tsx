import GoodsReceipt from "../../entities/GoodsReceipt";
import { useEffect, useState } from "react";
import DoubleCheckedGoodsReceipt from "./DoubleCheckedGoodsReceipt";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";
import { goodsReceiptService } from "../../services";
import formatDate from "../../utils/formatDate";
import formatMoney from "../../utils/formatMoney";
export default function ImprortHistoryOrderPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [receipts, setReceipts] = useState<GoodsReceipt[]>([]);
  useEffect(() => {
    const fetchGoodsReceipts = async () => {
      try {
        const response = await goodsReceiptService.getAllGoodsReceipts();
        if (response.data.EC === 0) {
          setReceipts(response.data.DT);
          console.log("Fetched goods receipts successfully");
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

  const rows = receipts.map((item, index) => {
    return {
      ...item,
      index: index + 1,
    };
  });
  const columns: GridColDef[] = [
    { field: "index", headerName: "STT", flex: 0.5 },
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "receiptDate",
      headerName: "Date",
      flex: 1,
      valueGetter: (_, row) => {
        if (row.receiptDate) {
          return formatDate(row.receiptDate);
        }
        return "";
      },
    },
    { field: "staffId", headerName: "Staff ID", flex: 1 },
    { field: "providerId", headerName: "Provider ID", flex: 1 },
    {
      field: "totalCost",
      headerName: "Total Cost",
      flex: 1,
      valueGetter: (_, row) => {
        return formatMoney(row.totalCost.toString());
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<InfoIcon />}
          label="Info"
          onClick={() => {
            setSelectedGoodReceipt(params.row as GoodsReceipt);
            setIsDoubleCheckedGoodReceiptPopupOpen(true);
          }}
        />,
      ],
    },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white gap-4 relative rounded-xl p-4 w-2/3 max-h-[80vh] overflow-hidden">
        <button
          className="absolute flex flex-col items-center top-2 right-4 w-7 h-7 bg-black text-white rounded-full"
          onClick={onClose}
        >
          <span className="text-[16px] font-bold">x</span>
        </button>
        <div className="header w-full flex flex-row justify-between pl-4 mb-5">
          <h3 className="font-semibold text-[28px] ">Import history</h3>
        </div>
        <div className="w-full px-1 ">
          {/* <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.id}</td>
                  <td className="text-center">{item.receiptDate}</td>
                  <td className="text-center">{item.staffId}</td>
                  <td className="text-center">{item.providerId}</td>
                  <td className="text-center">{item.totalCost}</td> */}
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
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={
              rows.length < 5 ? [5, rows.length] : [5, rows.length + 1]
            }
            slots={{ toolbar: GridToolbar }}
            rowSelection={false}
          />
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
