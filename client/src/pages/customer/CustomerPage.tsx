import { useState } from "react";
import { Customer } from "../../entities";
import { Button } from "@mui/material";
import { AddCustomerPopup, CustomersTable } from "../../components";

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [isAddCustomerPopupOpen, setIsAddCustomerPopupOpen] = useState(false);
  return (
    <div className="bg-white w-full h-screen">
      <div className="header w-full flex gap-4 p-4">
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
      </div>
      <div className="table-container w-full px-8 py-4">
        <CustomersTable customers={customers} />
      </div>
      {isAddCustomerPopupOpen && (
        <AddCustomerPopup
          onClose={() => setIsAddCustomerPopupOpen(false)}
          onCustomerCreated={(customer) =>
            setCustomers([...customers, customer])
          }
          onCustomerUpdated={(customer) =>
            setCustomers(
              customers.map((p) => (p.id === customer.id ? customer : p))
            )
          }
        />
      )}
    </div>
  );
}
