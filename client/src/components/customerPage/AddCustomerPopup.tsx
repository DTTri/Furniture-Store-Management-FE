import { Button } from "@mui/material";
import { Customer } from "../../entities";
import { useState } from "react";
import http from "../../api/http";
import AddCustomerDTO from "./AddCustomerDTO";

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
  const [name, setName] = useState(customer?.name || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [email, setEmail] = useState(customer?.email || "");
  const validateInputs = () => {
    if (!name || !phone || !email) {
      return false;
    }
    if (
      !/^\d+$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return false;
    }
    return true;
  };
  const handleAddCustomer = async () => {
    if (!validateInputs()) {
      alert("Invalid input");
      return;
    }
    try {
      const newCustomer: AddCustomerDTO = {
        name,
        phone,
        email,
      };
      const res = await http.post("/customers/create-customer", newCustomer);
      if (res.data.EC === 0) {
        onCustomerCreated(res.data.DT);
        onClose();
      } else {
        console.error("Failed to create customer:", res.data.EM);
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };
  const handleUpdateCustomer = async () => {
    if (!validateInputs()) {
      alert("Invalid input");
      return;
    }
    try {
      const updatedCustomer: AddCustomerDTO = {
        name,
        phone,
        email,
      };
      const res = await http.put(
        "/customers/update-customer/" + customer?.id,
        updatedCustomer
      );
      if (res.data.EC === 0) {
        onCustomerUpdated(res.data.DT);
        onClose();
      } else {
        console.error("Failed to update customer:", res.data.EM);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
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
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              onChange={(e) => {
                setPhone(e.target.value);
              }}
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
