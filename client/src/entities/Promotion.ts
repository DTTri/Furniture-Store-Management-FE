type Promotion = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  promotionProducts: {
    variantId: number;
    discount: number;
  }[];
};
export default Promotion;
