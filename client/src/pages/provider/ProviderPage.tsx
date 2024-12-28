import { Button } from "@mui/material";
import { ProvidersTable } from "../../components";
import { useState } from "react";
import { Provider } from "../../entities";
import AddProviderPopup from "../../components/providerPage/AddProviderPopup";
import { sProvider } from "../../store";
export default function ProviderPage() {
  const providers = sProvider.use((v) => v.providers);

  const [isAddProviderPopupOpen, setIsAddProviderPopupOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider>(
    providers[0]
  );
  const [isForUpdate, setIsForUpdate] = useState(false);

  return (
    <div className="bg-white w-full h-full">
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
        <ProvidersTable
          providers={providers}
          onEditProvider={(provider) => {
            setIsAddProviderPopupOpen(true);
            setSelectedProvider(provider);
            setIsForUpdate(true);
          }}
        />
      </div>
      {isAddProviderPopupOpen && (
        <AddProviderPopup
          onClose={() => {
            setIsAddProviderPopupOpen(false);
            setIsForUpdate(false);
          }}
          onProviderCreated={(provider) =>
            //setProviders([...providers, provider])
            sProvider.set((v) => {
              v.value.providers = [...v.value.providers, provider];
            })
          }
          provider={isForUpdate ? selectedProvider : undefined}
          onProviderUpdated={(provider) =>
            sProvider.set((v) => {
              v.value.providers = v.value.providers.map((p) =>
                p.id === provider.id ? provider : p
              );
            })
          }
        />
      )}
    </div>
  );
}
