type AddRepairOrderDTO = {
  productName: string;
  description: string;
  details: string;
  cost?: number;
  estimateFinishDate: string;
  customerId: number;
};
export default AddRepairOrderDTO;
