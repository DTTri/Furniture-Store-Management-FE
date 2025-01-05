import { Button } from "@mui/material";
import { Provider } from "../../entities";
import { useState } from "react";
import AddProviderDTO from "./AddProviderDTO";
import { providerService } from "../../services";
import { toast } from "react-toastify";
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
      toast.error("Please fill in all fields");
      return false;
    }
    // validate phone and email
    if (
      !/^\d{10}$/.test(phone) ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast.error("Invalid phone or email");
      return false;
    }
    return true;
  };

  const handleAddProvider = async () => {
    if (!validateInputs()) {
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
      const response = await providerService.createProvider(newProvider);
      if (response.data.EC === 0) {
        toast.success("Provider created successfully");
        onProviderCreated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to add provider: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to add provider");
      console.error("Error adding provider:", error);
    }
  };
  const handleUpdateProvider = async () => {
    if (!validateInputs() || !provider) {
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
      const response = await providerService.updateProvider(
        provider?.id,
        updatedProvider
      );
      if (response.data.EC === 0) {
        toast.success("Provider updated successfully");
        onProviderUpdated(response.data.DT);
        onClose();
      } else {
        toast.error("Failed to update provider: " + response.data.EM);
      }
    } catch (error) {
      toast.error("Failed to update provider");
      console.error("Error updating provider:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
        <h2 className="text-xl text-[#383E49] font-bold flex-1">
          {provider ? "Update" : "Add new"} provider
        </h2>
        <hr className="w-full border-[#E1E8F1] border-t-2 mb-2" />
        <div className="w-full flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="newProviderNameInput"
              name="name"
              placeholder="Name"
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
              className="border border-gray-500 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-500"
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
            variant="outlined"
            style={{
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
