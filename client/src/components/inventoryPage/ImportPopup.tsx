import { useState } from "react";
import Product from "../../entities/Product";
export default function ImportPopup({
  onClose,
  products,
}: {
  onClose: () => void;
  products: Product[];
}) {
  const [importedProducts, setImportedProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);

  const handleAddProductToImport = (product: Product, quantity: number) => {
    setImportedProducts((prevImportedProducts) => {
      const existingProduct = prevImportedProducts.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return prevImportedProducts;
      }

      return [...prevImportedProducts, { product, quantity }];
    });
  };
  const handleAddProductSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const comboBox = document.getElementById(
      "selectedProduct"
    ) as HTMLSelectElement;
    // get the index of the selected product
    const selectedIndex = comboBox.selectedIndex;
    // get the quantity from the input
    const quantity = parseInt(
      (document.getElementById("importQuantity") as HTMLInputElement).value
    );
    if (isNaN(quantity) || quantity <= 0) {
      return;
    }
    handleAddProductToImport(products[selectedIndex], quantity);
  };

  const handleImport = () => {
    products.forEach((product) => {
      const importedProduct = importedProducts.find(
        (item) => item.product.id === product.id
      );
      if (importedProduct) {
        product.stock += importedProduct.quantity;
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white flex gap-4 relative rounded-xl p-4 w-2/3 max-h-[80vh] overflow-hidden">
        <button className="absolute top-2 right-2" onClick={onClose}>
          x
        </button>
        <div className="add-product-to-import w-1/3 border-r-2">
          <h2 className="text-center text-xl font-bold">Chọn sản phẩm</h2>
          <form
            className="grid grid-cols-2 gap-4 p-4"
            onSubmit={handleAddProductSubmit}
          >
            <select
              id="selectedProduct"
              className="border border-gray-300 rounded-md p-1"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Số lượng"
              className="border border-gray-300 rounded-md p-1"
              id="importQuantity"
              onChange={(event) => {
                event.target.value = Math.max(
                  0,
                  parseInt(event.target.value)
                ).toString();
              }}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-2 py-1 rounded-md"
            >
              Thêm
            </button>
          </form>
        </div>
        <div className="imported-products w-2/3">
          <h2 className="text-center text-xl font-bold">Phiếu nhập hàng</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá nhập</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {importedProducts.map((item, index) => (
                <tr key={item.product.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.product.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.product.originalPrice}</td>
                  <td className="text-center">
                    {item.product.originalPrice * item.quantity}
                  </td>
                  <td className="text-center">
                    <button className="w-8 h-8 border-2">i</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-4 p-4">
            <button
              onClick={handleImport}
              className="bg-blue-600 text-white px-2 py-1 rounded-md"
            >
              Nhập hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
