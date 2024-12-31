type AddWarrantyOrderDTO = {
  warrantyId: number;
  description: string;
  details: string;
  cost?: number;
  estimateFinishDate?: string;
};
export default AddWarrantyOrderDTO;
