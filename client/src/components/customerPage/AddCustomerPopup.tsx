import { Button } from "@mui/material";
import { Customer } from "../../entities";

export default function AddCustomerPopup({
  onClose,
  onCustomerCreated,
  customer,
  onCustomerUpdated,
}: {
  onClose: () => void;
  onCustomerCreated: (customer: Customer) => void;
  customer?: Customer;
  onCustomerUpdated: (customer: Customer) => void;
}) {
  const handleAddCustomer = async () => {};
  const handleUpdateCustomer = async () => {};
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="newCustomerNameInput"
              name="name"
              placeholder="Name"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {}}
              defaultValue={customer?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="newCustomerPhoneInput"
              name="phone"
              placeholder="Phone"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {}}
              defaultValue={customer?.phone}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="newCustomerEmailInput"
              name="email"
              placeholder="Email"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {}}
              defaultValue={customer?.email}
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
            id="cancelAddCustomerButton"
          >
            Cancel
          </Button>
          {customer ? (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleUpdateCustomer}
              id="confirmUpdateCustomerButton"
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddCustomer}
              id="confirmAddCustomerButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
