import { useState } from "react";
import { Customer } from "../../entities";
import { Button } from "@mui/material";
import { AddCustomerPopup, CustomersTable } from "../../components";
import { customerService } from "../../services";
import sCustomer from "../../store/customerStore";
import { sUser } from "../../store";
export default function CustomerPage() {
  const customers = sCustomer.use((v) => v.customers);

  const [isAddCustomerPopupOpen, setIsAddCustomerPopupOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    customers[0]
  );
  const [isForUpdate, setIsForUpdate] = useState(false);

  const [
    isConfirmDeleteCustomerPopupOpen,
    setIsConfirmDeleteCustomerPopupOpen,
  ] = useState(false);

  const userPermissions = sUser.use((v) => v.permissions);
  const handleDeleteCustomer = async () => {
    try {
      const res = await customerService.deleteCustomer(selectedCustomer.id);
      if (res.data.EC === 0) {
        sCustomer.set((v) => {
          v.value.customers = v.value.customers.filter(
            (c) => c.id !== selectedCustomer.id
          );
        });
        setIsConfirmDeleteCustomerPopupOpen(false);
      } else {
        console.error("Failed to delete customer:", res.data.EM);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  return (
    <div className="bg-white w-full h-full p-4">
      <div className="header flex flex-row justify-between items-center mb-4 px-4">
        <h2 className="page-header">Customer</h2>
        {userPermissions.includes(27) && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsAddCustomerPopupOpen(true);
            }}
            style={{
              textTransform: "none",
            }}
            id="addProductButton"
          >
            Add Customer
          </Button>
        )}
      </div>
      <div className="table-container w-full">
        <CustomersTable
          customers={customers}
          onEditCustomer={(customer) => {
            setIsAddCustomerPopupOpen(true);
            setSelectedCustomer(customer);
            setIsForUpdate(true);
          }}
          onDeleteCustomer={(customer) => {
            setSelectedCustomer(customer);
            setIsConfirmDeleteCustomerPopupOpen(true);
          }}
        />
      </div>
      {isAddCustomerPopupOpen && (
        <AddCustomerPopup
          onClose={() => {
            setIsAddCustomerPopupOpen(false);
            setIsForUpdate(false);
          }}
          onCustomerCreated={(customer) =>
            sCustomer.set((v) => {
              v.value.customers = [...v.value.customers, customer];
            })
          }
          customer={isForUpdate ? selectedCustomer : undefined}
          onCustomerUpdated={(customer) =>
            sCustomer.set((v) => {
              v.value.customers = v.value.customers.map((c) =>
                c.id === customer.id ? customer : c
              );
            })
          }
        />
      )}
      {isConfirmDeleteCustomerPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="popup bg-white rounded-xl p-4 w-1/4 min-w-[390px] overflow-y-auto relative flex flex-col gap-2">
            <div className="w-full flex flex-col gap-4">
              <p>Are you sure you want to delete this customer?</p>
            </div>
            <div className="buttons-container w-full flex justify-end gap-2">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                  textTransform: "none",
                }}
                onClick={() => {
                  setIsConfirmDeleteCustomerPopupOpen(false);
                }}
                id="cancelDeleteCustomerButton"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "green",
                  textTransform: "none",
                }}
                onClick={() => {
                  handleDeleteCustomer();
                }}
                id="confirmDeleteCustomerButton"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
