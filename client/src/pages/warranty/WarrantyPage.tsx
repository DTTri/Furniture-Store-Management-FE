import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { WarrantyOrder } from "../../entities";
import warrantyService from "../../services/warranty.service";
import WarrantyOrdersTable from "../../components/warrantyPage/WarrantyOrdersTable";
import AddWarrantyOrderPopup from "../../components/warrantyPage/AddWarrantyOrderPopup";

export default function WarrantyPage() {
  const [warrantyOrders, setWarrantyOrders] = useState<WarrantyOrder[]>([]);
  useEffect(() => {
    const fetchWarrantyOrders = async () => {
      try {
        const res = await warrantyService.getAllWarrantyOrders();
        console.log(res);
        if (res.data.EC === 0) {
          setWarrantyOrders(res.data.DT);
        } else {
          console.error("Failed to fetch warranty orders:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching warranty orders:", error);
      }
    };
    fetchWarrantyOrders();
  }, []);

  const [isAddWarrantyOrderPopupOpen, setIsAddWarrantyOrderPopupOpen] =
    useState(false);
  const [selectedWarrantyOrder, setSelectedWarrantyOrder] =
    useState<WarrantyOrder>(warrantyOrders[0]);
  const [isForUpdate, setIsForUpdate] = useState(false);

  return (
    <div className="bg-white w-full h-screen">
      <div className="header w-full flex gap-4 p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAddWarrantyOrderPopupOpen(true);
          }}
          style={{
            textTransform: "none",
          }}
          id="addProductButton"
        >
          Add warranty order
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <WarrantyOrdersTable
          warrantyOrders={warrantyOrders}
          onEditwarrantyOrder={(warrantyOrder) => {
            setIsAddWarrantyOrderPopupOpen(true);
            setSelectedWarrantyOrder(warrantyOrder);
            setIsForUpdate(true);
          }}
        />
      </div>
      {isAddWarrantyOrderPopupOpen && (
        <AddWarrantyOrderPopup
          onClose={() => {
            setIsAddWarrantyOrderPopupOpen(false);
            setIsForUpdate(false);
          }}
          onWarrantyOrderCreated={(warrantyOrder) =>
            setWarrantyOrders([...warrantyOrders, warrantyOrder])
          }
          warrantyOrder={isForUpdate ? selectedWarrantyOrder : undefined}
          onWarrantyOrderUpdated={(warrantyOrder) =>
            setWarrantyOrders(
              warrantyOrders.map((p) =>
                p.id === warrantyOrder.id ? warrantyOrder : p
              )
            )
          }
        />
      )}
    </div>
  );
}
