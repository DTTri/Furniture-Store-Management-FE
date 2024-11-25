type CreatePromotionDTO = {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  promotionProducts: {
    variantId: number;
    discount: number;
  }[];
};
export default CreatePromotionDTO;
// {
//     "name": "promotion 3",
//     "description": "description for promotion 1",
//     "startDate": "2024-11-24",
//     "finishDate": "2024-11-25",
//     "promotionProducts": [
//         {
//             "variantId": 1,
//             "discount": 10
//         },
//         {
//             "variantId": 2,
//             "discount": 15
//         }
//     ]
// }
