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
        <div className="information-container w-1/2 border-r-2 border-r-black"></div>
        <div className="variants-container w-1/2"></div>
      </div>
    </div>
  );
}
