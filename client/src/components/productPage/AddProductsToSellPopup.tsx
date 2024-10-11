// import Product from "../../entities/Product";
// import { useState } from "react";
// export default function AddProductsToSellPopup({
//   onClose,
//   products,
// }: {
//   onClose: () => void;
//   products: Product[];
// }) {
//   const [quantities, setQuantities] = useState(
//     products.reduce((acc, product) => {
//       acc[product.id] = 0;
//       return acc;
//     }, {} as Record<string, number>)
//   );

//   const handleQuantityChange = (productId: string, value: number) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [productId]: Math.max(0, value),
//     }));
//   };

//   const handleAddToSell = () => {
//     products.forEach((product) => {
//       product.forSale += quantities[product.id];
//       product.stock -= quantities[product.id];
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white relative rounded-xl p-4 w-1/2 max-h-[80vh] overflow-hidden">
//         <button className="absolute top-2 right-2" onClick={onClose}>
//           x
//         </button>
//         <h2 className="text-xl font-bold">Nhập hàng từ kho</h2>
//         {/* Filter bar */}
//         <div className="flex items-center gap-2 mb-4">
//           <input
//             type="text"
//             placeholder="Tìm kiếm sản phẩm"
//             className="border border-gray-300 rounded-md p-1 w-full"
//           />
//           <button className="bg-blue-600 text-white px-2 py-1 rounded-md">
//             Tìm
//           </button>
//         </div>
//         <div className="table-container">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th>STT</th>
//                 <th>Sản phẩm</th>
//                 <th>Giá bán</th>
//                 <th>Đang bán</th>
//                 <th>Tồn kho</th>
//                 <th>Tình trạng</th>
//                 <th>Lấy ra</th>
//               </tr>
//             </thead>
//             <tbody className="max-h-96 overflow-y-auto">
//               {products.map((product, index) => (
//                 <tr key={product.id}>
//                   <td className="text-center">{index + 1}</td>
//                   <td className="text-center">{product.name}</td>
//                   <td className="text-center">{product.productPrice}</td>
//                   <td className="text-center">{product.forSale}</td>
//                   <td className="text-center">{product.stock}</td>
//                   <td className="text-center">
//                     {product.isSelling ? "Sẵn sàng" : "Đang duyệt"}
//                   </td>
//                   <td className="text-center">
//                     <input
//                       type="number"
//                       className="border border-gray-300 rounded-md p-1 w-16"
//                       id="quantity"
//                       disabled={!product.isSelling}
//                       onChange={(e) => {
//                         e.target.value = Math.min(
//                           product.stock,
//                           parseInt(e.target.value)
//                         ).toString();
//                         handleQuantityChange(
//                           product.id,
//                           parseInt(e.target.value)
//                         );
//                       }}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="flex justify-end mt-4">
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//             onClick={() => handleAddToSell()}
//           >
//             Thêm vào hóa đơn
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
