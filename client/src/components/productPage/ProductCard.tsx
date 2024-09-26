import Product from "../../entities/Product";

export default function ProductCard({
  product,
  onClick,
  isInInvoice,
}: {
  product: Product;
  onClick: () => void;
  isInInvoice: boolean;
}) {
  return (
    <div className="product-card bg-white rounded-lg shadow-md max-w-64">
      <div className="product-image h-32 overflow-hidden rounded-t-lg">
        <img src="/images/chair.jpg" alt="product" className="object-cover" />
      </div>
      <div className="product-info p-4">
        <h3 className="product-name text-lg font-semibold">{product.name}</h3>
        <p className="product-category text-sm text-gray-500">
          {product.category}
        </p>
        <div className="product-price flex items-center justify-between">
          <span className="text-lg font-semibold text-red-500">
            {product.productPrice.toLocaleString()}đ
          </span>
        </div>
        <div className="product-stock text-sm text-gray-500">
          Còn {product.forSale}
        </div>
      </div>
      <div className="product-action p-4">
        <button
          onClick={onClick}
          disabled={product.forSale === 0}
          // if product is not isSelling, invisible the button

          className={`${
            isInInvoice ? "bg-red-600" : "bg-blue-600"
          } text-white w-full py-2 rounded-md ${
            product.isSelling ? "" : "hidden"
          }`}
        >
          {isInInvoice ? "Xóa khỏi hóa đơn" : "Thêm vào hóa đơn"}
        </button>
      </div>
    </div>
  );
}
