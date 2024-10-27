import { Product } from "../../entities";

export default function ProductCard({
  product,
  onSeeDetailsClick,
}: {
  product: Product;
  onSeeDetailsClick: () => void;
}) {
  return (
    <div className="product-card w-[252px] h-[265px] bg-white rounded-lg shadow-md">
      <div className="product-image w-full h-1/2 overflow-hidden rounded-t-lg">
        <img src="/images/chair.jpg" alt="product" className="object-cover" />
      </div>
      <div className="product-info w-full p-4">
        <div className="flex justify-between items-center">
          <p className="product-category text-xs text-blue-400">
            {product.category}
          </p>
          <button
            onClick={() => onSeeDetailsClick()}
            className="button--information bg-black text-white rounded-full w-4 h-4 text-xs"
          >
            i
          </button>
        </div>
        <h3 className="product-name text-lg font-semibold">{product.name}</h3>
        <div className="product-price flex items-center justify-between">
          <span className="text-lg font-semibold text-black">
            {product.price} VND
          </span>
        </div>
        <div
          className={`product-state text-base ${
            product.status === "stop selling"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {product.status}
        </div>
      </div>
    </div>
  );
}
