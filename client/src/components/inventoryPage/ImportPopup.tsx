import { useState } from "react";
import ProductVaraint from "../../entities/ProductVariant";
import { Product } from "../../entities";

export default function ImportPopup({
  onClose,
  products,
  productVariants,
}: {
  onClose: () => void;
  products: Product[];
  productVariants: ProductVaraint[];
}) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [importedProductVariants, setImportedProductVariants] = useState<
    { variant: ProductVaraint; quantity: number }[]
  >([]);

  const handleAddVariantToImport = (
    variant: ProductVaraint,
    quantity: number
  ) => {
    setImportedProductVariants((prevImportedVariants) => {
      const existingVariant = prevImportedVariants.find(
        (item) => item.variant.id === variant.id
      );
      if (existingVariant) {
        return prevImportedVariants;
      }

      return [...prevImportedVariants, { variant, quantity }];
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const comboBox = document.getElementById(
      "selectedVariant"
    ) as HTMLSelectElement;
    const selectedIndex = comboBox.selectedIndex;
    handleAddVariantToImport(
      productVariants[selectedIndex],
      parseInt(
        (document.getElementById("importQuantity") as HTMLInputElement).value
      )
    );
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProductId(event.target.value);
  };

  const filteredVariants = productVariants.filter(
    (variant) => variant.productId === selectedProductId
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white flex gap-4 relative rounded-xl p-4 w-1/2 max-h-[80vh] overflow-hidden">
        <button className="absolute top-2 right-2" onClick={onClose}>
          x
        </button>
        <div className="add-variant-to-import w-1/3 border-r-2">
          <h2 className="text-center text-xl font-bold">
            Chọn sản phẩm và biến thể
          </h2>
          <form
            className="grid grid-cols-2 gap-4 p-4"
            onSubmit={handleFormSubmit}
          >
            <select
              id="selectedProduct"
              className="border border-gray-300 rounded-md p-1"
              onChange={handleProductChange}
            >
              <option value="">Chọn sản phẩm</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <select
              id="selectedVariant"
              className="border border-gray-300 rounded-md p-1"
              disabled={!selectedProductId}
            >
              <option value="">Chọn biến thể</option>
              {filteredVariants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {`${variant.color} - ${variant.size} - ${variant.price}`}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Số lượng"
              className="border border-gray-300 rounded-md p-1"
              id="importQuantity"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-2 py-1 rounded-md"
            >
              Thêm
            </button>
          </form>
        </div>
        <div className="imported-variants w-2/3">
          <h2 className="text-center text-xl font-bold">Phiếu nhập hàng</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>STT</th>
                <th>Biến thể</th>
                <th>Số lượng</th>
                <th>Giá nhập</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {importedProductVariants.map((item, index) => (
                <tr key={item.variant.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{`${item.variant.color} - ${item.variant.size}`}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.variant.buyingPrice}</td>
                  <td className="text-center">
                    {item.variant.buyingPrice * item.quantity}
                  </td>
                  <td className="text-center">
                    <button className="w-8 h-8 border-2">i</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
