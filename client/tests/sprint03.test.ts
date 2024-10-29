import { Selector } from "testcafe";

fixture("Product Management").page("http://localhost:5173/");

// test("AddNewProduct01", async (t) => {
//   // Click vào Button có id `addProductButton`
//   await t.click(Selector("#addProductButton"));

//   // Nhập các thông tin cần thiết vào các trường trong `AddProductPopup`
//   await t.typeText(Selector("#newProductNameInput"), "Binh hoa go");
//   await t.click(Selector("#newProductCategoryInput"));
//   await t.click(
//     Selector("#newProductCategoryInput option").withText("Bàn ghế")
//   );
//   await t.typeText(
//     Selector("#newProductDescriptionInput"),
//     "New Product Description"
//   );
//   await t.click(Selector("#newProductCatalogueInput"));
//   await t.click(
//     Selector("#newProductCatalogueInput option").withText("Bàn ghế gỗ")
//   );

//   await t.typeText(Selector("#newProductWarrantyInput"), "12");

//   // Nhấn Button `Create` để thêm sản phẩm mới
//   await t.click(Selector("#confirmAddProductButton"));

//   // Kiểm tra xem một `ProductCard` mới đã được thêm vào `#productGallery`
//   const newProductCard = Selector("#productGallery .product-card").withText(
//     "Binh hoa go"
//   );
//   await t.expect(newProductCard.exists).ok();

//   // Kiểm tra xem `ProductCard` hiển thị đúng `name`, `category`, và `status` là "sold out"
//   await t
//     .expect(newProductCard.find("#productCardName").innerText)
//     .eql("Binh hoa go");
//   await t
//     .expect(newProductCard.find("#productCardCategory").innerText)
//     .eql("Bàn ghế");
//   await t
//     .expect(newProductCard.find("#productCardStatus").innerText)
//     .eql("sold out");

//   // Click vào `ProductCard` để mở `ProductDetailsPopup`

//   await t.click(newProductCard);

//   // Kiểm tra các thông tin chi tiết trong `ProductDetailsPopup`
//   const productDetailsPopup = Selector(".popup");
//   await t.expect(productDetailsPopup.exists).ok();
//   await t
//     .expect(productDetailsPopup.find("#productDetailsName").innerText)
//     .eql("Binh hoa go");
//   await t
//     .expect(productDetailsPopup.find("#productDetailsDescription").value)
//     .eql("New Product Description");
//   await t
//     .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
//     .eql("Bàn ghế");
//   await t
//     .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
//     .eql("12 tháng");
// });

// test("UpdateProduct01", async (t) => {
//   // Nhấn vào ProductCard có text "Binh hoa su"
//   const productCard = Selector("#productGallery .product-card").withText(
//     "asdsad"
//   );
//   await t.click(productCard);

//   // ProductDetailsPopup hiện lên, lưu lại các thông tin
//   const productDetailsPopup = Selector(".popup");
//   await t.expect(productDetailsPopup.exists).ok();

//   const name = await productDetailsPopup.find("#productDetailsName").innerText;
//   const description = await productDetailsPopup.find(
//     "#productDetailsDescription"
//   ).value;
//   const category = await productDetailsPopup.find("#productDetailsCategory")
//     .innerText;
//   const warranty = await productDetailsPopup.find("#productDetailsWarranty")
//     .innerText;

//   // Nhấn vào #updateProductButton
//   await t.click(Selector("#updateProductButton"));

//   // AddProductPopup hiện lên, các input có giá trị default đúng như các giá trị hiển thị trên ProductDetailsPopup đã lưu
//   const addProductPopup = Selector(".popup");
//   await t.expect(addProductPopup.exists).ok();

//   await t.expect(Selector("#newProductNameInput").value).eql(name);
//   await t
//     .expect(Selector("#newProductDescriptionInput").value)
//     .eql(description);
//   await t.expect(Selector("#newProductCategoryInput").value).eql(category);
//   await t.expect(Selector("#newProductWarrantyInput").value).eql(warranty);

//   // Sửa lại các input thành giá trị khác, các select chọn option khác
//   await t
//     .selectText(Selector("#newProductNameInput"))
//     .pressKey("delete")
//     .typeText(Selector("#newProductNameInput"), "Tu giay");
//   await t
//     .selectText(Selector("#newProductDescriptionInput"))
//     .pressKey("delete")
//     .typeText(Selector("#newProductDescriptionInput"), "Tu giay 5 ngan");
//   await t.click(Selector("#newProductCategoryInput"));
//   await t.click(
//     Selector("#newProductCategoryInput option").withText("Bàn ghế")
//   );
//   await t
//     .selectText(Selector("#newProductWarrantyInput"))
//     .pressKey("delete")
//     .typeText(Selector("#newProductWarrantyInput"), "15");

//   // Nhấn nút #confirmUpdateProductButton
//   await t.click(Selector("#confirmUpdateProductButton"));

//   // ProductCard ở ngoài màn hình ProductPage đã thay đổi tên đúng với tên mới vừa nhập
//   const updatedProductCard = Selector("#productGallery .product-card").withText(
//     "Tu giay"
//   );
//   await t.expect(updatedProductCard.exists).ok();

//   // Nhấp vào ProductCard đó thì ProductDetailsPopup hiện lên và các thông tin cũng đã cập nhật
//   await t.click(updatedProductCard);
//   await t.expect(productDetailsPopup.exists).ok();
//   await t
//     .expect(productDetailsPopup.find("#productDetailsName").innerText)
//     .eql("Tu giay");
//   await t
//     .expect(productDetailsPopup.find("#productDetailsDescription").value)
//     .eql("Tu giay 5 ngan");
//   await t
//     .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
//     .eql("Bàn ghế");
//   await t
//     .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
//     .eql("15");
// });

// test("DeleteProduct01", async (t) => {
//   // Nhấp vào ProductCard có text "Binh hoa su"
//   const productCard = Selector("#productGallery .product-card").withText(
//     "Binh hoa su"
//   );
//   await t.click(productCard);

//   // ProductDetailsPopup hiện lên, nhấp vào button #stopSellingButton
//   const productDetailsPopup = Selector(".popup");
//   await t.expect(productDetailsPopup.exists).ok();
//   await t.click(Selector("#stopSellingButton"));

//   // confirmStopSellingPopup hiện lên, có 2 nút #cancelStopSellingButton #confirmStopSellingButton, nhấp vào nút #confirmStopSellingButton
//   const confirmStopSellingPopup = Selector(".confirmStopSellingPopup");
//   await t.expect(confirmStopSellingPopup.exists).ok();
//   await t.click(Selector("#confirmStopSellingButton"));

//   // ProductCard "Binh hoa su" có #productCardStatus là "stop selling"
//   const updatedProductCard = Selector("#productGallery .product-card").withText(
//     "Binh hoa su"
//   );
//   await t.expect(updatedProductCard.exists).ok();
//   await t
//     .expect(updatedProductCard.find("#productCardStatus").innerText)
//     .eql("stop selling");
// });

test("SearchProduct01", async (t) => {
  // Nhập tên product vào input #searchProductInput
  const searchInput = Selector("#searchProductInput");
  const searchText = "Binh hoa su";
  await t.typeText(searchInput, searchText);

  // Kiểm tra xem #productGallery chỉ hiển thị các ProductCard có #productCardName chứa text vừa nhập (không quan tâm in hoa/in thường)
  const productGallery = Selector("#productGallery");
  const productCards = productGallery.find(".product-card");

  const productCardCount = await productCards.count;

  for (let i = 0; i < productCardCount; i++) {
    const productCardName = await productCards.nth(i).find("#productCardName")
      .innerText;
    await t
      .expect(productCardName.toLowerCase())
      .contains(searchText.toLowerCase());
  }
});
