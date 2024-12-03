type Report = {
  totalSoldProduct: number;
  totalRevenue: number;
  totalExpense: number;
  paymentMethodStatistic: {
    cash: number;
    qr: number;
  };
  currentPromotion: {
    id: number;
    name: string;
    description: string;
    totalQuantitySold: number;
    totalRevenue: number;
    finishDate: string;
    status: string;
    startDate: string;
    createdAt: string;
    updatedAt: string;
  };
};

export default Report;
