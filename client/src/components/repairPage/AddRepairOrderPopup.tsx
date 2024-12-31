import { Button } from "@mui/material";
import { useState } from "react";
import AddRepairOrderDTO from "./AddRepairOrderDTO";
import UpdateRepairOrderDTO from "./UpdateRepairOrderDTO";
import RepairOrder from "../../entities/RepairOrder";
import repairService from "../../services/repair.service";
import { toast } from "react-toastify";

export default function AddRepairOrderPopup({
  onClose,
  onRepairOrderCreated,
  repairOrder,
  onRepairOrderUpdated,
}: {
  onClose: () => void;
  onRepairOrderCreated: (repairOrder: RepairOrder) => void;
  repairOrder?: RepairOrder;
  onRepairOrderUpdated: (repairOrder: RepairOrder) => void;
}) {
  const [productName, setProductName] = useState(
    repairOrder?.productName || ""
  );
  const [description, setDescription] = useState(
    repairOrder?.description || ""
  );
  const [details, setDetails] = useState(repairOrder?.details || "");
  const [cost, setCost] = useState(repairOrder?.cost || "");
  const [estimateFinishDate, setEstimateFinishDate] = useState(
    repairOrder?.estimateFinishDate || ""
  );
  const [customerId, setCustomerId] = useState(repairOrder?.customerId || 0);
  const [status, setStatus] = useState(repairOrder?.status || "");
  const validateInputs = () => {
    if (!productName || !description || !details || !customerId) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (cost && isNaN(Number(cost))) {
      toast.error("Cost must be a number");
      return false;
    }
    return true;
  };

  const handleAddRepairOrder = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const newRepairOrder: AddRepairOrderDTO = {
        productName,
        description,
        details,
        customerId,
        cost: cost ? Number(cost) : undefined,
        estimateFinishDate,
      };
      const response = await repairService.createRepairOrder(newRepairOrder);
      if (response.data.EC === 0) {
        toast.success("Repair order created successfully");
        onRepairOrderCreated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to add repair order");
      }
    } catch (error) {
      toast.error("Failed to add repair order");
      console.error("Error adding repair order:", error);
    }
  };

  const handleUpdateRepairOrder = async () => {
    if (!validateInputs() || !repairOrder) {
      return;
    }
    try {
      const updatedRepairOrder: UpdateRepairOrderDTO = {
        details,
        cost: cost ? Number(cost) : undefined,
        status,
      };
      const response = await repairService.updateRepairOrder(
        repairOrder.id,
        updatedRepairOrder
      );
      console.log(response);
      if (response.data.EC === 0) {
        toast.success("Repair order updated successfully");
        onRepairOrderUpdated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to update repair order");
      }
    } catch (error) {
      toast.error("Failed to update repair order");
      console.error("Error updating repair order:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="w-full flex flex-col gap-4">
          {!repairOrder && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="newRepairOrderProductNameInput"
                  name="productName"
                  placeholder="Product Name"
                  className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                  required
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  defaultValue={productName}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <input
                  id="newRepairOrderDescriptionInput"
                  name="description"
                  placeholder="Description"
                  className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  defaultValue={description}
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="details">Details</label>
            <textarea
              id="newRepairOrderDetailsInput"
              name="details"
              placeholder="Details"
              className="border border-gray-500 px-2 py-1 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
              style={{
                resize: "none",
              }}
              required
              onChange={(e) => {
                setDetails(e.target.value);
              }}
              defaultValue={details}
            />
          </div>
          {!repairOrder && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="cost">Cost</label>
                <input
                  id="newRepairOrderCostInput"
                  name="cost"
                  placeholder="Cost"
                  className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                  defaultValue={cost}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="customerId">Customer ID</label>
                <input
                  id="newRepairOrderCustomerIdInput"
                  name="customerId"
                  placeholder="Customer ID"
                  className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                  required
                  onChange={(e) => {
                    setCustomerId(Number(e.target.value));
                  }}
                  defaultValue={customerId}
                />
              </div>
            </>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="estimateFinishDate">Estimate Finish Date</label>
            <input
              id="newRepairOrderEstimateFinishDateInput"
              name="estimateFinishDate"
              type="date"
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
              onChange={(e) => {
                setEstimateFinishDate(e.target.value);
              }}
              defaultValue={estimateFinishDate}
            />
          </div>
          {repairOrder && (
            <div className="flex flex-col gap-2">
              <label htmlFor="status">Status</label>
              <input
                id="updateRepairOrderStatusInput"
                name="status"
                placeholder="Status"
                className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                defaultValue={status}
              />
            </div>
          )}
        </div>
        <div className="buttons-container w-full flex justify-end gap-2">
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              textTransform: "none",
            }}
            onClick={onClose}
            id="cancelAddRepairOrderButton"
          >
            Cancel
          </Button>
          {repairOrder ? (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleUpdateRepairOrder}
              id="confirmUpdateRepairOrderButton"
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddRepairOrder}
              id="confirmAddRepairOrderButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
