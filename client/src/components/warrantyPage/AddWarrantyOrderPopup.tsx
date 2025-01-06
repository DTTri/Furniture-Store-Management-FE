import { Button } from "@mui/material";
import { useState } from "react";
import AddWarrantyOrderDTO from "./AddWarrantyOrderDTO";
import UpdateWarrantyOrderDTO from "./UpdateWarrantyOrderDTO";
import WarrantyOrder from "../../entities/WarrantyOrder";
import warrantyService from "../../services/warranty.service";
import { toast } from "react-toastify";
import printWarrantyOrder from "./printWarrantyOrder";

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
  const [warrantyId, setWarrantyId] = useState(warrantyOrder?.warrantyId || 0);

  const [status, setStatus] = useState(warrantyOrder?.status || "");
  const validateInputs = () => {
    if (!description || !details || (!warrantyOrder && !warrantyId)) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (cost && isNaN(Number(cost))) {
      toast.error("Cost must be a number");
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
        warrantyId,
        cost: cost ? Number(cost) : undefined,
        estimateFinishDate,
      };
      const response = await warrantyService.createWarrantyOrder(
        newWarrantyOrder
      );
      if (response.data.EC === 0) {
        toast.success("Warranty order created successfully");
        onWarrantyOrderCreated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to add warranty order: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to add warranty order");
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
        status,
      };
      const response = await warrantyService.updateWarrantyOrder(
        warrantyOrder.id,
        updatedWarrantyOrder
      );
      console.log(response);
      if (response.data.EC === 0) {
        toast.success("Warranty order updated successfully");
        onWarrantyOrderUpdated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to update warranty order: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to update warranty order");
      console.error("Error updating warranty order:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/2 min-w-[390px] max-h-[80%] overflow-y-auto flex flex-col gap-2">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-xl text-[#383E49] font-bold flex-1">
            {warrantyOrder ? "Update" : "Add new"} warranty order
          </h2>
          <hr className="w-full border-[#E1E8F1] border-t-2" />
          <div className="warranty-order-details flex w-full justify-between gap-4 flex-wrap mb-4">
            <div className="flex flex-col gap-2 basis-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <input
                  id="newWarrantyOrderDescriptionInput"
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
              <div className="flex flex-col gap-2 h-full">
                <label htmlFor="details">Details</label>
                <textarea
                  id="newWarrantyOrderDetailsInput"
                  name="details"
                  placeholder="Details"
                  className="border border-gray-500 px-2 py-1 rounded-md h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
            </div>
            <div className="flex flex-col gap-2 basis-[45%]">
              {!warrantyOrder && (
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="cost">Cost</label>
                    <div className="flex items-center gap-2">
                      <input
                        id="newWarrantyOrderCostInput"
                        name="cost"
                        placeholder="Cost"
                        className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                        onChange={(e) => {
                          setCost(e.target.value);
                        }}
                        defaultValue={cost}
                      />
                      <span>VND</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="warrantyId">Warranty ID</label>
                    <input
                      id="newWarrantyOrderWarrantyIdInput"
                      name="warrantyId"
                      placeholder="Warranty ID"
                      className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
                  className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                  onChange={(e) => {
                    setEstimateFinishDate(e.target.value);
                  }}
                  defaultValue={estimateFinishDate}
                />
              </div>
              {warrantyOrder && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="catalogue">Status</label>
                  <select
                    value={status}
                    name="status"
                    id="newWarrantyOrderStatusInput"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setStatus(e.target.value);
                    }}
                    className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="buttons-container w-full flex justify-end gap-2">
          {warrantyOrder && (
            <Button
              variant="outlined"
              color="primary"
              style={{
                textTransform: "none",
                fontSize: "14px",
                border: "1px solid black",
                color: "black",
              }}
              onClick={() => {
                printWarrantyOrder(warrantyOrder);
              }}
            >
              Print
            </Button>
          )}
          <Button
            variant="outlined"
            style={{
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
