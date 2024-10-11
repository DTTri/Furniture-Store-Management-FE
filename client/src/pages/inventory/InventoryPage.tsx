import ImportPopup from "../../components/inventoryPage/ImportPopup";
import ImportHistoryOrderPopup from "../../components/inventoryPage/ImportHistoryOrderPopup";
import DoubleCheckedGoodReceipt from "../../components/inventoryPage/DoubleCheckedGoodReceipt";
import NavBar from "../../components/NavBar";
import Product from "../../entities/Product";
import { useState } from "react";
import testGoodReceipt from "../../data/testGoodReceipt";
export default function InventoryPage() {
  const initialProducts: Product[] = [
    {
      id: "1",
      name: "Ghế văn phòng",
      category: "Nội thất",
      originalPrice: 400000,
      productPrice: 450000,
      isSelling: true,
      stock: 10,
      forSale: 5,
    },
    {
      id: "2",
      name: "Bàn làm việc",
      category: "Nội thất",
      originalPrice: 500000,
      productPrice: 550000,
      isSelling: true,
      stock: 5,
      forSale: 3,
    },
    {
      id: "3",
      name: "Đèn ngủ",
      category: "Nội thất",
      originalPrice: 1000000,
      productPrice: 1200000,
      isSelling: true,
      stock: 3,
      forSale: 2,
    },
    {
      id: "4",
      name: "Kệ sách",
      category: "Nội thất",
      originalPrice: 400000,
      productPrice: 450000,
      isSelling: true,
      stock: 10,
      forSale: 5,
    },
    {
      id: "5",
      name: "Tủ dép",
      category: "Nội thất",
      originalPrice: 500000,
      productPrice: 550000,
      isSelling: true,
      stock: 5,
      forSale: 3,
    },
    {
      id: "6",
      name: "Bình hoa",
      category: "Nội thất",
      originalPrice: 1000000,
      productPrice: 1200000,
      isSelling: true,
      stock: 3,
      forSale: 2,
    },
    {
      id: "7",
      name: "Bàn ăn",
      category: "Nội thất",
      originalPrice: 400000,
      productPrice: 450000,
      isSelling: false,
      stock: 10,
      forSale: 5,
    },
    {
      id: "8",
      name: "Ghế Sofa",
      category: "Nội thất",
      originalPrice: 500000,
      productPrice: 550000,
      isSelling: true,
      stock: 5,
      forSale: 3,
    },
    {
      id: "9",
      name: "Đèn trần",
      category: "Nội thất",
      originalPrice: 1000000,
      productPrice: 1200000,
      isSelling: true,
      stock: 3,
      forSale: 2,
    },
  ];

  const [products] = useState<Product[]>(initialProducts);

  const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
  const [isPopupImportHistoryOrder, setIsPopupImportHistoryOrder] =
    useState(false);
  const [isDoubleCheckedGoodReceipt, setIsDoubleCheckedGoodReceipt] =
    useState(false);
  return (
    <div className="flex gap-8 bg-gray-100">
      <NavBar />
      <div className="container bg-white mb-8">
        <div className="header w-full flex gap-4 p-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className="border border-gray-300 rounded-md p-1 w-1/4"
          />
          <button
            onClick={() => setIsImportPopupOpen(true)}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Nhập hàng
          </button>
          <button
            onClick={() => setIsImportPopupOpen(true)}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Lịch sử nhập hàng
          </button>
          <button
            onClick={() => {
              console.log("importHistoryOrder");
              setIsPopupImportHistoryOrder(true);
            }}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Lịch sử nhập hàng
          </button>
          <button
            onClick={() => {
              setIsDoubleCheckedGoodReceipt(true);
            }}
            className="bg-blue-600 text-white px-2 py-1 rounded-md"
          >
            Nhập hàng check lần 2
          </button>
        </div>
        <div className="table-container w-full px-8 py-4">
          <table className="w-full">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Giá nhập</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Đang bán</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{product.name}</td>
                  <td className="text-center">{product.originalPrice}</td>
                  <td className="text-center">{product.productPrice}</td>
                  <td className="text-center">{product.stock}</td>
                  <td className="text-center">{product.forSale}</td>
                  <td className="text-center">
                    {product.isSelling ? "Sẵn sàng" : "Đang duyệt"}
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
      {isImportPopupOpen && (
        <ImportPopup
          onClose={() => setIsImportPopupOpen(false)}
          products={products}
        />
      )}
      {isPopupImportHistoryOrder && (
        <ImportHistoryOrderPopup
          onClose={() => setIsPopupImportHistoryOrder(false)}
          receipts={testGoodReceipt}
        />
      )}
      {isDoubleCheckedGoodReceipt && (
        <DoubleCheckedGoodReceipt
          onClose={() => setIsDoubleCheckedGoodReceipt(false)}
          receipts={testGoodReceipt}
        />
      )}
    </div>
  );
}
