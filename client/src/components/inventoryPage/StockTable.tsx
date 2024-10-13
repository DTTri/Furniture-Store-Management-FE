import { Product } from "../../entities";

export default function StockTable({ products }: { products: Product[] }) {
  // type Product = {
  //     id: string;
  //     name: string;
  //     category: string;
  //     price: string;
  //     status: ProductStatus;
  //     image: string;
  //     description: string;
  //     warranty: number;
  //     available: number;
  //     quantity: number;
  //     defective: number;
  //     sold: number;
  //     catelogueId: string;
  //   };
  return (
    <div className="w-full h-[27rem] overflow-y-auto">
      <table className="w-full h-10 overflow-y-auto">
        <thead>
          <tr>
            <th className="py-1 border border-gray-400">STT</th>
            <th className="py-1 border border-gray-400">Tên sản phẩm</th>
            <th className="py-1 border border-gray-400">Danh mục</th>
            <th className="py-1 border border-gray-400">Khoảng giá</th>
            <th className="py-1 border border-gray-400">Trạng thái</th>
            <th className="py-1 border border-gray-400">Tổng số lượng</th>
            <th className="py-1 border border-gray-400">Đang bán</th>
            <th className="py-1 border border-gray-400">Hỏng</th>
            <th className="py-1 border border-gray-400">Đã bán</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="text-center py-1 border border-gray-300">
                {index + 1}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.name}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.category}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.price}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.status}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.quantity}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.available}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.defective}
              </td>
              <td className="text-center py-1 border border-gray-300">
                {product.sold}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
