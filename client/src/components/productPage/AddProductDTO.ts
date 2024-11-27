type AddProductDTO = {
  name: string;
  description: string;
  catalogueId: number;
  warranty: number;
  image?: string;
};

export default AddProductDTO;
