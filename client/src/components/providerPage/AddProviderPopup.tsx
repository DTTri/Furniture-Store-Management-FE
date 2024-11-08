import { Button } from "@mui/material";
import { Provider } from "../../entities";
import { useState } from "react";
import http from "../../api/http";
import AddProviderDTO from "./AddProviderDTO";

export default function AddProviderPopup({
  onClose,
  onProviderCreated,
  provider,
  onProviderUpdated,
}: {
  onClose: () => void;
  onProviderCreated: (provider: Provider) => void;
  provider?: Provider;
  onProviderUpdated: (provider: Provider) => void;
}) {
  const [name, setName] = useState(provider?.name || "");
  const [address, setAddress] = useState(provider?.address || "");
  const [phone, setPhone] = useState(provider?.phone || "");
  const [email, setEmail] = useState(provider?.email || "");
  const [president, setPresident] = useState(provider?.president || "");

  const validateInputs = () => {
    if (!name || !address || !phone || !email || !president) {
      return false;
    }
    // validate phone and email
    if (
      !/^\d+$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return false;
    }
    return true;
  };

  const handleAddProvider = async () => {
    if (!validateInputs()) {
      alert("Invalid input");
      return;
    }
    try {
      const newProvider: AddProviderDTO = {
        name,
        address,
        phone,
        email,
        president,
      };
      const response = await http.post(
        "/providers/create-provider",
        newProvider
      );
      if (response.data.EC === 0) {
        onProviderCreated(response.data.DT);
        onClose();
      } else {
        alert(response.data.EM);
      }
    } catch (error) {
      console.error("Error adding provider:", error);
    }
  };
  const handleUpdateProvider = async () => {
    if (!validateInputs()) {
      alert("Invalid input");
      return;
    }
    try {
      const updatedProvider: AddProviderDTO = {
        name,
        address,
        phone,
        email,
        president,
      };
      const response = await http.put(
        `/providers/update-provider/${provider?.id}`,
        updatedProvider
      );
      if (response.data.EC === 0) {
        onProviderUpdated(response.data.DT);
        onClose();
      } else {
        alert(response.data.EM);
      }
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="newProviderNameInput"
              name="name"
              placeholder="Name"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              defaultValue={provider?.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              id="newProviderAddressInput"
              name="address"
              placeholder="Address"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              defaultValue={provider?.address}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              id="newProviderPhoneInput"
              name="phone"
              placeholder="Phone"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              defaultValue={provider?.phone}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="newProviderEmailInput"
              name="email"
              placeholder="Email"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              defaultValue={provider?.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="president">President</label>
            <input
              id="newProviderPresidentInput"
              name="president"
              placeholder="President"
              className="border border-gray-300 px-2 py-1 rounded-md"
              required
              onChange={(e) => {
                setPresident(e.target.value);
              }}
              defaultValue={provider?.president}
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
            id="cancelAddProviderButton"
          >
            Cancel
          </Button>
          {provider ? (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleUpdateProvider}
              id="confirmUpdateProviderButton"
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                textTransform: "none",
              }}
              onClick={handleAddProvider}
              id="confirmAddProviderButton"
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
