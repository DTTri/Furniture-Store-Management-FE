import NavBar from "../../components/NavBar";
import ProductCard from "../../components/ProductCard";
import Product from "../../entities/Product";
export default function ProductPage() {
  // hardcode data
  const products: Product[] = [
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
      name: "Ghế văn phòng",
      category: "Nội thất",
      originalPrice: 400000,
      productPrice: 450000,
      isSelling: true,
      stock: 10,
      forSale: 5,
    },
    {
      id: "5",
      name: "Bàn làm việc",
      category: "Nội thất",
      originalPrice: 500000,
      productPrice: 550000,
      isSelling: true,
      stock: 5,
      forSale: 3,
    },
    {
      id: "6",
      name: "Đèn ngủ",
      category: "Nội thất",
      originalPrice: 1000000,
      productPrice: 1200000,
      isSelling: true,
      stock: 3,
      forSale: 2,
    },
    {
      id: "7",
      name: "Ghế văn phòng",
      category: "Nội thất",
      originalPrice: 400000,
      productPrice: 450000,
      isSelling: true,
      stock: 10,
      forSale: 5,
    },
    {
      id: "8",
      name: "Bàn làm việc",
      category: "Nội thất",
      originalPrice: 500000,
      productPrice: 550000,
      isSelling: true,
      stock: 5,
      forSale: 3,
    },
    {
      id: "9",
      name: "Đèn ngủ",
      category: "Nội thất",
      originalPrice: 1000000,
      productPrice: 1200000,
      isSelling: true,
      stock: 3,
      forSale: 2,
    },
  ];

  // productcard onclick function
  const handleProductCardClick = (product: Product) => {
    console.log(product);
  };
  return (
    <div className="bg-gray-50 w-full h-screen max-h-screen flex gap-4 p-8">
      <NavBar />
      <div className="product-gallery w-3/5 h-full overflow-y-auto grid grid-cols-3 gap-4 p-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductCardClick(product)}
          />
        ))}
      </div>
      <div className="receipt-container w-1/4 h-3/4 bg-white p-4">
        <h3 className="text-2xl font-bold mb-4">Hóa đơn</h3>
        <div className="receipt-table">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
