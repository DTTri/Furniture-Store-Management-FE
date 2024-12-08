import { Button } from "@mui/material";
import { useState } from "react";
import AddWarrantyOrderDTO from "./AddWarrantyOrderDTO";
import UpdateWarrantyOrderDTO from "./UpdateWarrantyOrderDTO";
import WarrantyOrder from "../../entities/WarrantyOrder";
import warrantyService from "../../services/warranty.service";

export default function AddWarrantyOrderPopup({
  onClose,
  onWarrantyOrderCreated,
  warrantyOrder,
  onWarrantyOrderUpdated,
}: {
  onClose: () => void;
  onWarrantyOrderCreated: (warrantyOrder: WarrantyOrder) => void;
  warrantyOrder?: WarrantyOrder;
  onWarrantyOrderUpdated: (warrantyOrder: WarrantyOrder) => void;
}) {
  const [description, setDescription] = useState(
    warrantyOrder?.description || ""
  );
  const [details, setDetails] = useState(warrantyOrder?.details || "");
  const [cost, setCost] = useState(warrantyOrder?.cost || "");
  const [estimateFinishDate, setEstimateFinishDate] = useState(
    warrantyOrder?.estimateFinishDate || ""
  );
  const [staffId, setStaffId] = useState(warrantyOrder?.staffId || 0);
  const [warrantyId, setWarrantyId] = useState(warrantyOrder?.warrantyId || 0);

  const validateInputs = () => {
    if (
      !description ||
      !details ||
      (!warrantyOrder && (!staffId || !warrantyId))
    ) {
      return false;
    }
    if (cost && isNaN(Number(cost))) {
      return false;
    }
    return true;
  };

  const handleAddWarrantyOrder = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const newWarrantyOrder: AddWarrantyOrderDTO = {
        description,
        details,
        staffId,
        warrantyId,
        cost: cost ? Number(cost) : undefined,
        estimateFinishDate,
      };
      const response = await warrantyService.createWarrantyOrder(
        newWarrantyOrder
      );
      if (response.data.EC === 0) {
        onWarrantyOrderCreated(response.data.DT);
        onClose();
      } else {
      }
    } catch (error) {
      console.error("Error adding warranty order:", error);
    }
  };

  const handleUpdateWarrantyOrder = async () => {
    if (!validateInputs() || !warrantyOrder) {
      return;
    }
    try {
      const updatedWarrantyOrder: UpdateWarrantyOrderDTO = {
        description,
        details,
        estimateFinishDate,
      };
      const response = await warrantyService.updateWarrantyOrder(
        warrantyOrder.id,
        updatedWarrantyOrder
      );
      console.log(response);
      if (response.data.EC === 0) {
        onWarrantyOrderUpdated(response.data.DT);
        onClose();
      } else {
      }
    } catch (error) {
      console.error("Error updating warranty order:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description</label>
            <input
              id="newWarrantyOrderDescriptionInput"
              name="description"
              placeholder="Description"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              defaultValue={description}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="details">Details</label>
            <textarea
              id="newWarrantyOrderDetailsInput"
              name="details"
              placeholder="Details"
              className="border border-gray-300 px-2 py-1 rounded-md h-24"
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
          {!warrantyOrder && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="cost">Cost</label>
                <input
                  id="newWarrantyOrderCostInput"
                  name="cost"
                  placeholder="Cost"
                  className="border border-gray-300 px-2 py-1 rounded-md"
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                  defaultValue={cost}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="staffId">Staff ID</label>
                <input
                  id="newWarrantyOrderStaffIdInput"
                  name="staffId"
                  placeholder="Staff ID"
                  className="border border-gray-300 px-2 py-1 rounded-md"
                  required
                  onChange={(e) => {
                    setStaffId(Number(e.target.value));
                  }}
                  defaultValue={staffId}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="warrantyId">Warranty ID</label>
                <input
                  id="newWarrantyOrderWarrantyIdInput"
                  name="warrantyId"
                  placeholder="Warranty ID"
                  className="border border-gray-300 px-2 py-1 rounded-md"
                  required
                  onChange={(e) => {
                    setWarrantyId(Number(e.target.value));
                  }}
                  defaultValue={warrantyId}
                />
              </div>
            </>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="estimateFinishDate">Estimate Finish Date</label>
            <input
              id="newWarrantyOrderEstimateFinishDateInput"
              name="estimateFinishDate"
              type="date"
              className="border border-gray-300 px-2 py-1 rounded-md"
              onChange={(e) => {
                setEstimateFinishDate(e.target.value);
              }}
              defaultValue={estimateFinishDate}
            />
          </div>
        </div>
        <div className="buttons-container w-full flex justify-end gap-2">
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              textTransform: "none",
            }}
            onClick={onClose}
            id="cancelAddWarrantyOrderButton"
          >
            Cancel
          </Button>
          {warrantyOrder ? (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleUpdateWarrantyOrder}
              id="confirmUpdateWarrantyOrderButton"
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddWarrantyOrder}
              id="confirmAddWarrantyOrderButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
