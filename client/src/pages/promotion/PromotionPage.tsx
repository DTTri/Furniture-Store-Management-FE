import { Button } from "@mui/material";
import { useState } from "react";
import AddPromotionPopup from "../../components/promotionPage/AddPromotionPopup";
import { promotionService } from "../../services";
import PromotionsTable from "../../components/promotionPage/PromotionsTable";
import Promotion from "../../entities/Promotion";
import { sPromotion } from "../../store";

export default function PromotionPage() {
  const promotions = sPromotion.use((v) => v.promotions);

  const [isAddPromotionPopupOpen, setIsAddPromotionPopupOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion>(
    promotions[0]
  );
  const [isForUpdate, setIsForUpdate] = useState(false);

  return (
    <div className="bg-white w-full h-full">
      <div className="header w-full flex gap-4 p-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAddPromotionPopupOpen(true);
          }}
          style={{
            textTransform: "none",
          }}
          id="addPromotionButton"
        >
          Add Promotion
        </Button>
      </div>
      <div className="table-container w-full px-8 py-4">
        <PromotionsTable
          promotions={promotions}
          onEditPromotion={(promotion) => {
            setIsAddPromotionPopupOpen(true);
            setSelectedPromotion(promotion);
            setIsForUpdate(true);
          }}
          onDeletePromotion={async (promotion) => {
            try {
              const res = await promotionService.deletePromotion(promotion.id);
              if (res.status === 200) {
                sPromotion.set((v) => {
                  v.value.promotions = v.value.promotions.filter(
                    (p) => p.id !== promotion.id
                  );
                });
              } else {
                console.error("Failed to delete promotion:", res.data.EM);
              }
            } catch (error) {
              console.error("Error deleting promotion:", error);
            }
          }}
        />
      </div>
      {isAddPromotionPopupOpen && (
        <AddPromotionPopup
          onClose={() => {
            setIsAddPromotionPopupOpen(false);
            setIsForUpdate(false);
          }}
          onPromotionCreated={(promotion) =>
            sPromotion.set((v) => {
              v.value.promotions = [...v.value.promotions, promotion];
            })
          }
          promotion={isForUpdate ? selectedPromotion : undefined}
          onPromotionUpdated={(promotion) =>
            sPromotion.set((v) => {
              v.value.promotions = v.value.promotions.map((p) =>
                p.id === promotion.id ? promotion : p
              );
            })
          }
        />
      )}
    </div>
  );
}
