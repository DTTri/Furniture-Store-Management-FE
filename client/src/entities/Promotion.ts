type Promotion = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  PromotionProducts: {
    variantId: number;
    discount: number;
  }[];
  createdAt: string;
  updatedAt: string;
};
export default Promotion;
