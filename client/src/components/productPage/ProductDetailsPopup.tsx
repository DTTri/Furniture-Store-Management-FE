import { useState } from "react";
import { Product, ProductVaraint } from "../../entities";

export default function ProductDetailsPopup({
  product,
  variants,
  onClose,
}: {
  product: Product;
  variants: ProductVaraint[];
  onClose: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVaraint>(
    variants[0]
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white flex justify-around relative rounded-xl p-4 py-10 w-1/2 max-h-[80vh] min-h-[20vh] overflow-hidden">
        <button
          className="absolute top-2 right-2 w-6 h-6 text-base bg-black text-white rounded-full"
          onClick={onClose}
        >
          x
        </button>
        <div className="buttons-container flex justify-between items-cente gap-2 absolute bottom-2 right-2">
          <button className="bg-blue-600 text-white px-2 py-1 rounded-md">
            Chỉnh sửa
          </button>
          <button className="bg-red-600 text-white px-2 py-1 rounded-md">
            Xóa
          </button>
        </div>
        <div className="information-container flex flex-col gap-2 items-start w-1/2 border-r-2 border-r-black">
          <h3 className="product-name text-black text-xl font-semibold">
            {product.name}
          </h3>
          <div className="product-information w-full flex flex-col gap-2">
            <p className="title text-black text-lg font-semibold">
              Thông tin sản phẩm
            </p>
            <table>
              <tbody>
                <tr>
                  <td className="title">Tên sản phẩm:</td>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <td className="title">Danh mục:</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td className="title">Khoảng giá:</td>
                  <td>{product.price}</td>
                </tr>
                <tr>
                  <td className="title">Trạng thái:</td>
                  <td>{product.status}</td>
                </tr>
                <tr>
                  <td className="title">Thời gian bảo hành:</td>
                  <td>{product.warranty} tháng</td>
                </tr>
                <tr>
                  <td className="title">Tổng sản phẩm:</td>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <td className="title">Số lượng còn lại:</td>
                  <td>{product.available}</td>
                </tr>
                <tr>
                  <td className="title">Số lượng đã bán:</td>
                  <td>{product.sold}</td>
                </tr>
                <tr>
                  <td className="title">Số lượng bị lỗi:</td>
                  <td>{product.defective}</td>
                </tr>
                <tr>
                  <td className="title">Mô tả:</td>
                  <td>{product.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="provider-information flex flex-col gap-2 items-start">
            <p className="title text-black text-lg font-semibold">
              Thông tin nhà cung cấp
            </p>
            <table>
              <tbody>
                <tr>
                  <td className="title">Tên nhà cung cấp:</td>
                  <td>Ronald Martin</td>
                </tr>
                <tr>
                  <td className="title">Số điện thoại:</td>
                  <td>0987654321</td>
                </tr>
              </tbody>
            </table>
            <table></table>
          </div>
        </div>
        <div className="variants-container w-1/2 flex flex-col items-center gap-4">
          <div className="variant-image h-32 w-32 overflow-hidden rounded-lg">
            <img
              src="https://i.pinimg.com/enabled_lo/564x/e9/b6/a9/e9b6a90559732efe97ce9883edd99841.jpg"
              alt="variant"
              className="object-cover"
            />
          </div>
          <table className="w-5/6 ml-16">
            <tbody>
              <tr>
                <td className="title">SKU</td>
                <td>{selectedVariant.SKU}</td>
              </tr>
              <tr>
                <td className="title">Màu</td>
                <td>{selectedVariant.color}</td>
              </tr>
              <tr>
                <td className="title">Kích thước</td>
                <td>{selectedVariant.size}</td>
              </tr>
              <tr>
                <td className="title">Giá bán</td>
                <td>{selectedVariant.price}</td>
              </tr>
            </tbody>
          </table>
          {/* slider for selecting variant */}
          <div className="variant-slider w-5/6 flex gap-1 overflow-x-auto">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="image-container w-16 h-16 overflow-hidden hover:cursor-pointer min-w-16"
              >
                <img
                  src={variant.image}
                  alt="variant"
                  className="object-cover"
                  onClick={() => setSelectedVariant(variant)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
