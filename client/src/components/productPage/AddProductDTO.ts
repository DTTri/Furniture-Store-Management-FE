type AddProductDTO = {
  name: string;
  category: string;
  description: string;
  catalogueId: number;
  warranty: number;
  image?: string;
};
// {
//     "category": "bàn ghế gỗ",
//     "name": "tủ gỗ",
//     "description": "aaaaaaa",
//     "warranty": 1,
//     "catalogueId": 1
// }
export default AddProductDTO;
