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
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const handleDeleteWarrantyOrder = async () => {
    try {
      const res = await warrantyService.deleteWarrantyOrder(
        selectedWarrantyOrder.id
      );
      if (res.data.EC === 0) {
        setWarrantyOrders(
          warrantyOrders.filter((p) => p.id !== selectedWarrantyOrder.id)
        );
        console.log("Successfully deleted warranty order");
      } else {
        console.error("Failed to delete warranty order:", res.data.EM);
      }
    } catch (error) {
      console.error("Error deleting warranty order:", error);
    }
  };

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
          onEditWarrantyOrder={(warrantyOrder) => {
            setIsAddWarrantyOrderPopupOpen(true);
            setSelectedWarrantyOrder(warrantyOrder);
            setIsForUpdate(true);
          }}
          onDeleteWarrantyOrder={(warrantyOrder) => {
            setSelectedWarrantyOrder(warrantyOrder);
            setIsConfirmDeletePopupOpen(true);
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
      {isConfirmDeletePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2>
              Are you sure you want to delete warranty order{" "}
              {selectedWarrantyOrder.id}?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setIsConfirmDeletePopupOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleDeleteWarrantyOrder();
                  setIsConfirmDeletePopupOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
