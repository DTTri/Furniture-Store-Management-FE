import { Button } from "@mui/material";
import { ProvidersTable } from "../../components";
import { useEffect, useState } from "react";
import { Provider } from "../../entities";
import AddProviderPopup from "../../components/providerPage/AddProviderPopup";
import { providerService } from "../../services";
export default function ProviderPage() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await providerService.getAllProviders();
        if (res.data.EC === 0) {
          setProviders(res.data.DT);
        } else {
          console.error("Failed to fetch providers:", res.data.EM);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchProviders();
  }, []);

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
            setProviders([...providers, provider])
          }
          provider={isForUpdate ? selectedProvider : undefined}
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
