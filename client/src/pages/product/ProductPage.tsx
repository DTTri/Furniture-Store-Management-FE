import { useState } from "react";
import ProductCard from "../../components/productPage/ProductCard";
import Product from "../../entities/Product";
import NavBar from "../../components/NavBar";
import ProductDetailsPopup from "../../components/productPage/ProductDetailsPopup";
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

  // State for invoice
  // const [invoice, setInvoice] = useState<
  //   { product: Product; quantity: number }[]
  // >([]);

  // // add product to invoice
  // const handleAddToInvoice = (product: Product) => {
  //   setInvoice((prevInvoice) => {
  //     const existingProduct = prevInvoice.find(
  //       (item) => item.product.id === product.id
  //     );
  //     if (existingProduct) {
  //       return prevInvoice;
  //     }
  //     return [...prevInvoice, { product, quantity: 1 }];
  //   });
  // };

  // // remove product from invoice
  // const handleRemoveFromInvoice = (product: Product) => {
  //   setInvoice((prevInvoice) =>
  //     prevInvoice.filter((item) => item.product.id !== product.id)
  //   );
  // };

  // handle product quantity change in invoice
  // const handleQuantityChange = (product: Product, quantity: number) => {
  //   setInvoice((prevInvoice) =>
  //     prevInvoice.map((item) =>
  //       item.product.id === product.id
  //         ? {
  //             ...item,
  //             quantity: Math.min(Math.max(quantity, 1), product.forSale),
  //           }
  //         : item
  //     )
  //   );
  // };

  // // calculate total price
  // const totalPrice = invoice.reduce(
  //   (sum, item) => sum + item.product.productPrice * item.quantity,
  //   0
  // );

  // handle checkout button click
  // const handleCheckout = () => {
  //   // because the products data is hardcoded, i will update the product.forSale right here
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) => {
  //       const invoiceItem = invoice.find(
  //         (item) => item.product.id === product.id
  //       );
  //       if (invoiceItem) {
  //         return {
  //           ...product,
  //           forSale: product.forSale - invoiceItem.quantity,
  //         };
  //       }
  //       return product;
  //     })
  //   );
  //   // clear invoice
  //   setInvoice([]);
  // };

  // open the import products from inventory modal

  const [isProductDetailsPopupOpen, setIsProductDetailsPopupOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  return (
    <div className="bg-gray-100 w-full h-screen max-h-screen flex gap-4 p-8">
      <NavBar />
      <div className="container">
        <div className="header w-full bg-white flex gap-4 p-4">
          <div className="search-bar w-2/5">
            <input
              type="text"
              placeholder="Tìm sản phẩm"
              className="w-full p-2 rounded-md border border-gray-500"
            />
          </div>
        </div>
        <div className="body w-full flex p-4">
          <div className="product-gallery w-full h-full overflow-y-auto grid grid-cols-4 gap-4 p-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSeeDetailsClick={() => {
                  setSelectedProduct(product);
                  setIsProductDetailsPopupOpen(true);
                }}
              />
            ))}
          </div>
          {/* <div className="invoice-container w-1/3 bg-white p-4 ">
            <h3 className="text-2xl font-bold mb-4">Hóa đơn</h3>
            <div className="invoice-table ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="">
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.map((item, index) => (
                    <tr key={item.product.id} className="min-h-8">
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item.product.name}</td>
                      <td className="text-center">
                        {item.product.productPrice.toLocaleString()}đ
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product,
                              item.quantity + 1
                            )
                          }
                          disabled={item.quantity >= item.product.forSale}
                        >
                          +
                        </button>
                      </td>
                      <td className="text-center">
                        {(
                          item.product.productPrice * item.quantity
                        ).toLocaleString()}
                        đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="invoice-total mt-4 flex justify-between">
                <p>Tổng tiền:</p>
                <p className="total">{totalPrice.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={() => handleCheckout()}
              className="checkout-button bg-blue-600 text-white w-full py-2 rounded-md mt-4"
            >
              Thanh toán
            </button>
          </div> */}
        </div>
      </div>
      {isProductDetailsPopupOpen && (
        <ProductDetailsPopup
          product={selectedProduct}
          onClose={() => setIsProductDetailsPopupOpen(false)}
        />
      )}
    </div>
  );
}
