import { Product } from "../../entities";

export default function ProductCard({
  product,
  onSeeDetailsClick,
}: {
  product: Product;
  onSeeDetailsClick: () => void;
}) {
  return (
    <div
      onClick={onSeeDetailsClick}
      data-product-id={product.id}
      className="product-card w-[252px] h-[265px] bg-white rounded-lg border border-y-zinc-200 shadow-md shadow-slate-300 transform transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-400 cursor-pointer"
    >
      <div className="product-image w-full h-1/2 overflow-hidden rounded-t-lg">
        <img
          src={
            product.image && product.image !== ""
              ? product.image
              : "/images/chair.jpg"
          }
          alt="product"
          className="object-contain w-full"
        />
      </div>
      <div className="product-info w-full p-4">
        <div className="flex justify-between items-center">
          <p
            id="productCardCategory"
            className="product-category text-xs text-blue-400"
          >
            {/* {product.catalogueId} */}
          </p>
        </div>
        <h3 id="productCardName" className="product-name text-lg font-semibold">
          {product.name.length > 40
            ? product.name.slice(0, 40) + "..."
            : product.name}
        </h3>
        <div className="product-price flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Available: {product.available}
          </span>
        </div>
        <div
          className={`product-state text-base ${
            product.status === "stop selling"
              ? "text-red-500"
              : "text-green-500"
          }`}
          id="productCardStatus"
        >
          {product.status}
        </div>
      </div>
    </div>
  );
}
