type AddRepairOrderDTO = {
  productName: string;
  description: string;
  details: string;
  staffId: number;
  cost?: number;
  estimateFinishDate: string;
  customerId: number;
};
export default AddRepairOrderDTO;
