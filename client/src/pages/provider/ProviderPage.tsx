import { Button } from "@mui/material";
import { ProvidersTable } from "../../components";
import { useState } from "react";
import { Provider } from "../../entities";
import AddProviderPopup from "../../components/providerPage/AddProviderPopup";

export default function ProviderPage() {
  const [providers, setProviders] = useState<Provider[]>([]);

  const [isAddProviderPopupOpen, setIsAddProviderPopupOpen] = useState(false);
  return (
    <div className="bg-white w-full h-screen">
      <div className="header w-full flex gap-4 p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAddProviderPopupOpen(true);
          }}
          style={{
            textTransform: "none",
          }}
          id="addProductButton"
        >
          Add provider
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <ProvidersTable providers={providers} />
      </div>
      {isAddProviderPopupOpen && (
        <AddProviderPopup
          onClose={() => setIsAddProviderPopupOpen(false)}
          onProviderCreated={(provider) =>
            setProviders([...providers, provider])
          }
          onProviderUpdated={(provider) =>
            setProviders(
              providers.map((p) => (p.id === provider.id ? provider : p))
            )
          }
        />
      )}
    </div>
  );
}
