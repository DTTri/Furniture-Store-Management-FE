import { Button } from "@mui/material";
import { Customer } from "../../entities";
import { useState } from "react";
import AddCustomerDTO from "./AddCustomerDTO";
import { customerService } from "../../services";
import { toast } from "react-toastify";
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
      toast("Please fill in all fields", {
        type: "error",
      });
      return false;
    }
    if (/^\s|\s{2,}|\s$/.test(name)) {
      toast("Name cannot contain leading/trailing spaces or multiple spaces", {
        type: "error",
      });
      return false;
    }
    if (
      !/^\d{10}$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast("Phone or email is invalid", {
        type: "error",
      });
      return false;
    }
    return true;
  };
  const handleAddCustomer = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const newCustomer: AddCustomerDTO = {
        name,
        phone,
        email,
      };
      const res = await customerService.createCustomer(newCustomer);
      if (res.data.EC === 0) {
        onCustomerCreated(res.data.DT);
        toast("Customer created successfully", { type: "success" });
        onClose();
      } else {
        toast("Failed to create customer: " + res.data.EM, { type: "error" });
        console.error("Failed to create customer:", res.data.EM);
      }
    } catch (error) {
      toast("Failed to create customer", { type: "error" });
      console.error("Error creating customer:", error);
    }
  };
  const handleUpdateCustomer = async () => {
    if (!validateInputs() || !customer) {
      return;
    }
    try {
      const updatedCustomer: AddCustomerDTO = {
        name,
        phone,
        email,
      };
      const res = await customerService.updateCustomer(
        customer?.id,
        updatedCustomer
      );
      if (res.data.EC === 0) {
        onCustomerUpdated(res.data.DT);
        toast("Customer updated successfully", { type: "success" });
        onClose();
      } else {
        toast("Customer created successfully", { type: "error" });
        console.error("Failed to update customer:", res.data.EM);
      }
    } catch (error) {
      toast("Customer created successfully", { type: "error" });
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
