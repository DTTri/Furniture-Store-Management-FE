import { Button } from "@mui/material";
import { useState } from "react";
import { WarrantyOrder } from "../../entities";
import warrantyService from "../../services/warranty.service";
import WarrantyOrdersTable from "../../components/warrantyPage/WarrantyOrdersTable";
import AddWarrantyOrderPopup from "../../components/warrantyPage/AddWarrantyOrderPopup";
import { sUser, sWarranty } from "../../store";

export default function WarrantyPage() {
  const warrantyOrders = sWarranty.use((v) => v.warrantyOrders);

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
        sWarranty.set((v) => {
          v.value.warrantyOrders = v.value.warrantyOrders.filter(
            (p) => p.id !== selectedWarrantyOrder.id
          );
        });
        console.log("Successfully deleted warranty order");
      } else {
        console.error("Failed to delete warranty order:", res.data.EM);
      }
    } catch (error) {
      console.error("Error deleting warranty order:", error);
    }
  };

  const userPermissions = sUser.use((v) => v.permissions);

  return (
    <div className="bg-white w-full h-full p-4">
      <div className="header flex flex-row justify-between items-center mb-4 px-4">
        <h2 className="page-header">Warranty</h2>
        {userPermissions.includes(36) && (
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
        )}
      </div>
      <div className="table-container w-full">
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
            sWarranty.set((v) => {
              v.value.warrantyOrders = [
                ...v.value.warrantyOrders,
                warrantyOrder,
              ];
            })
          }
          warrantyOrder={isForUpdate ? selectedWarrantyOrder : undefined}
          onWarrantyOrderUpdated={(warrantyOrder) =>
            sWarranty.set((v) => {
              v.value.warrantyOrders = v.value.warrantyOrders.map((p) =>
                p.id === warrantyOrder.id ? warrantyOrder : p
              );
            })
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
