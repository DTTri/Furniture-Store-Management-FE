type AddWarrantyOrderDTO = {
  warrantyId: number;
  description: string;
  details: string;
  staffId: number;
  cost?: number;
  estimateFinishDate?: string;
};
export default AddWarrantyOrderDTO;
