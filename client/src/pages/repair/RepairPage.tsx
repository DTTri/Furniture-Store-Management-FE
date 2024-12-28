import { Button } from "@mui/material";
import { useState } from "react";
import { RepairOrder } from "../../entities";
import repairService from "../../services/repair.service";
import RepairOrdersTable from "../../components/repairPage/RepairOrdersTable";
import AddRepairOrderPopup from "../../components/repairPage/AddRepairOrderPopup";
import { sRepair } from "../../store";

export default function RepairPage() {
  const repairOrders = sRepair.use((v) => v.repairs);

  const [isAddRepairOrderPopupOpen, setIsAddRepairOrderPopupOpen] =
    useState(false);
  const [selectedRepairOrder, setSelectedRepairOrder] = useState<RepairOrder>(
    repairOrders[0]
  );
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const handleDeleteRepairOrder = async () => {
    try {
      const res = await repairService.deleteRepairOrder(selectedRepairOrder.id);
      if (res.data.EC === 0) {
        sRepair.set((v) => {
          v.value.repairs = v.value.repairs.filter(
            (p) => p.id !== selectedRepairOrder.id
          );
        });
        console.log("Successfully deleted repair order");
      } else {
        console.error("Failed to delete repair order:", res.data.EM);
      }
    } catch (error) {
      console.error("Error deleting repair order:", error);
    }
  };

  return (
    <div className="bg-white w-full h-full">
      <div className="header w-full flex gap-4 p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAddRepairOrderPopupOpen(true);
          }}
          style={{
            textTransform: "none",
          }}
          id="addRepairOrderButton"
        >
          Add repair order
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <RepairOrdersTable
          repairOrders={repairOrders}
          onEditRepairOrder={(repairOrder) => {
            setIsAddRepairOrderPopupOpen(true);
            setSelectedRepairOrder(repairOrder);
            setIsForUpdate(true);
          }}
          onDeleteRepairOrder={(repairOrder) => {
            setSelectedRepairOrder(repairOrder);
            setIsConfirmDeletePopupOpen(true);
          }}
        />
      </div>
      {isAddRepairOrderPopupOpen && (
        <AddRepairOrderPopup
          onClose={() => {
            setIsAddRepairOrderPopupOpen(false);
            setIsForUpdate(false);
          }}
          onRepairOrderCreated={(repairOrder) =>
            sRepair.set((v) => {
              v.value.repairs = [...v.value.repairs, repairOrder];
            })
          }
          repairOrder={isForUpdate ? selectedRepairOrder : undefined}
          onRepairOrderUpdated={(repairOrder) =>
            sRepair.set((v) => {
              v.value.repairs = v.value.repairs.map((p) =>
                p.id === repairOrder.id ? repairOrder : p
              );
            })
          }
        />
      )}
      {isConfirmDeletePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2>
              Are you sure you want to delete repair order{" "}
              {selectedRepairOrder.id}?
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
                  handleDeleteRepairOrder();
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
