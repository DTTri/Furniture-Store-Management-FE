import { Selector } from "testcafe";

fixture("Product Management").page("http://localhost:5173/");

test("AddNewProduct01", async (t) => {
  await t.click(Selector("#addProductButton"));
  await t.typeText(Selector("#newProductNameInput"), "Binh hoa go");
  await t.click(Selector("#newProductCategoryInput"));
  await t.click(
    Selector("#newProductCategoryInput option").withText("Bàn ghế")
  );
  await t.typeText(
    Selector("#newProductDescriptionInput"),
    "Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ..."
  );
  await t.click(Selector("#newProductCatalogueInput"));
  await t.click(
    Selector("#newProductCatalogueInput option").withText("Bàn ghế gỗ")
  );

  await t.typeText(Selector("#newProductWarrantyInput"), "12");
  await t.click(Selector("#confirmAddProductButton"));
  const newProductCard = Selector("#productGallery .product-card").withText(
    "Binh hoa go"
  );
  await t.expect(newProductCard.exists).ok();
  await t
    .expect(newProductCard.find("#productCardName").innerText)
    .eql("Binh hoa go");
  await t
    .expect(newProductCard.find("#productCardCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(newProductCard.find("#productCardStatus").innerText)
    .eql("sold out");

  await t.click(newProductCard);
  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t
    .expect(productDetailsPopup.find("#productDetailsName").innerText)
    .eql("Binh hoa go");
  await t
    .expect(productDetailsPopup.find("#productDetailsDescription").value)
    .eql("Sản phẩm được sản xuất ở nước Ý, chất liệu tự nhiên, ...");
  await t
    .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
    .eql("12 tháng");
});
test("AddNewProduct02", async (t) => {
  await t.click(Selector("#addProductButton"));
  await t.typeText(Selector("#newProductNameInput"), "Bàn mặt đá Ceramic");
  await t.click(Selector("#newProductCategoryInput"));
  await t.click(
    Selector("#newProductCategoryInput option").withText("Bàn ghế")
  );
  await t.typeText(
    Selector("#newProductDescriptionInput"),
    "New Product Description"
  );
  await t.click(Selector("#newProductCatalogueInput"));
  await t.click(
    Selector("#newProductCatalogueInput option").withText("Bàn ghế gỗ")
  );

  await t.typeText(Selector("#newProductWarrantyInput"), "12");
  await t.click(Selector("#confirmAddProductButton"));
  const newProductCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.expect(newProductCard.exists).ok();
  await t
    .expect(newProductCard.find("#productCardName").innerText)
    .eql("Bàn mặt đá Ceramic");
  await t
    .expect(newProductCard.find("#productCardCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(newProductCard.find("#productCardStatus").innerText)
    .eql("sold out");

  await t.click(newProductCard);
  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t
    .expect(productDetailsPopup.find("#productDetailsName").innerText)
    .eql("Bàn mặt đá Ceramic");
  await t
    .expect(productDetailsPopup.find("#productDetailsDescription").value)
    .eql("New Product Description");
  await t
    .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
    .eql("12");
});
test("AddNewProduct03", async (t) => {
  await t.click(Selector("#addProductButton"));
  await t.typeText(Selector("#newProductNameInput"), "Bộ bàn 6 ghế Monet");
  await t.click(Selector("#newProductCategoryInput"));
  await t.click(
    Selector("#newProductCategoryInput option").withText("Bàn ghế")
  );
  await t.typeText(Selector("#newProductDescriptionInput"), "");
  await t.click(Selector("#newProductCatalogueInput"));
  await t.click(
    Selector("#newProductCatalogueInput option").withText("Bàn ghế gỗ")
  );

  await t.typeText(Selector("#newProductWarrantyInput"), "12");
  await t.click(Selector("#confirmAddProductButton"));
  const newProductCard = Selector("#productGallery .product-card").withText(
    "Bộ bàn 6 ghế Monet"
  );
  await t.expect(newProductCard.exists).ok();
  await t
    .expect(newProductCard.find("#productCardName").innerText)
    .eql("Bộ bàn 6 ghế Monet");
  await t
    .expect(newProductCard.find("#productCardCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(newProductCard.find("#productCardStatus").innerText)
    .eql("sold out");

  await t.click(newProductCard);
  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t
    .expect(productDetailsPopup.find("#productDetailsName").innerText)
    .eql("Bộ bàn 6 ghế Monet");
  await t
    .expect(productDetailsPopup.find("#productDetailsDescription").value)
    .eql("");
  await t
    .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
    .eql("12 tháng");
});
test("AddNewProduct04", async (t) => {
  await t.click(Selector("#addProductButton"));
  await t.typeText(Selector("#newProductNameInput"), "");
  await t.click(Selector("#newProductCategoryInput"));
  await t.click(
    Selector("#newProductCategoryInput option").withText("Bàn ghế")
  );
  await t.typeText(
    Selector("#newProductDescriptionInput"),
    "New Product Description"
  );
  await t.click(Selector("#newProductCatalogueInput"));
  await t.click(
    Selector("#newProductCatalogueInput option").withText("Bàn ghế gỗ")
  );

  await t.typeText(Selector("#newProductWarrantyInput"), "12");
  await t.click(Selector("#confirmAddProductButton"));
  const newProductCard = Selector("#productGallery .product-card").withText("");
  await t.expect(newProductCard.exists).ok();
  await t.expect(newProductCard.find("#productCardName").innerText).eql("");
  await t
    .expect(newProductCard.find("#productCardCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(newProductCard.find("#productCardStatus").innerText)
    .eql("sold out");

  await t.click(newProductCard);
  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t
    .expect(productDetailsPopup.find("#productDetailsName").innerText)
    .eql("");
  await t
    .expect(productDetailsPopup.find("#productDetailsDescription").value)
    .eql("New Product Description");
  await t
    .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
    .eql("12 tháng");
});
test("UpdateProduct01", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Ghế gỗ cao cấp"
  );
  await t.click(productCard);
  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();

  const name = await productDetailsPopup.find("#productDetailsName").innerText;
  const description = await productDetailsPopup.find(
    "#productDetailsDescription"
  ).value;
  const category = await productDetailsPopup.find("#productDetailsCategory")
    .innerText;
  const warranty = await productDetailsPopup.find("#productDetailsWarranty")
    .innerText;
  await t.click(Selector("#updateProductButton"));
  const addProductPopup = Selector(".popup");
  await t.expect(addProductPopup.exists).ok();

  await t.expect(Selector("#newProductNameInput").value).eql(name);
  await t
    .expect(Selector("#newProductDescriptionInput").value)
    .eql(description);
  await t.expect(Selector("#newProductCategoryInput").value).eql(category);
  await t.expect(Selector("#newProductWarrantyInput").value).eql(warranty);
  await t
    .selectText(Selector("#newProductNameInput"))
    .pressKey("delete")
    .typeText(Selector("#newProductNameInput"), "Ghế gỗ bình thường");
  await t
    .selectText(Selector("#newProductDescriptionInput"))
    .pressKey("delete")
    .typeText(
      Selector("#newProductDescriptionInput"),
      "Được sản xuất ở Mỹ, màu sắc abc…"
    );
  await t.click(Selector("#newProductCategoryInput"));
  await t.click(
    Selector("#newProductCategoryInput option").withText("Bàn ghế")
  );
  await t
    .selectText(Selector("#newProductWarrantyInput"))
    .pressKey("delete")
    .typeText(Selector("#newProductWarrantyInput"), "15");
  await t.click(Selector("#confirmUpdateProductButton"));
  const updatedProductCard = Selector("#productGallery .product-card").withText(
    "Ghế gỗ bình thường"
  );
  await t.expect(updatedProductCard.exists).ok();
  await t.click(updatedProductCard);
  await t.expect(productDetailsPopup.exists).ok();
  await t
    .expect(productDetailsPopup.find("#productDetailsName").innerText)
    .eql("Ghế gỗ bình thường");
  await t
    .expect(productDetailsPopup.find("#productDetailsDescription").value)
    .eql("Được sản xuất ở Mỹ, màu sắc abc…");
  await t
    .expect(productDetailsPopup.find("#productDetailsCategory").innerText)
    .eql("Bàn ghế");
  await t
    .expect(productDetailsPopup.find("#productDetailsWarranty").innerText)
    .eql("15");
});

test("DeleteProduct01", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.click(productCard);

  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t.click(Selector("#stopSellingButton"));

  const confirmStopSellingPopup = Selector(".confirmStopSellingPopup");
  await t.expect(confirmStopSellingPopup.exists).ok();
  await t.click(Selector("#confirmStopSellingButton"));

  const updatedProductCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.expect(updatedProductCard.exists).ok();
  await t
    .expect(updatedProductCard.find("#productCardStatus").innerText)
    .eql("stop selling");
});

test("FindProduct01", async (t) => {
  const searchInput = Selector("#searchProductInput");
  const searchText = "Bàn mặt đá Ceramic";
  await t.typeText(searchInput, searchText);

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
test("FindProduct02", async (t) => {
  const searchInput = Selector("#searchProductInput");
  const searchText = "Ghế gỗ cao cấp";
  await t.typeText(searchInput, searchText);

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
test("FindProduct03", async (t) => {
  const searchInput = Selector("#searchProductInput");
  const searchText = "Bộ bàn 6 ghế Monet";
  await t.typeText(searchInput, searchText);

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
test("FindProduct04", async (t) => {
  const searchInput = Selector("#searchProductInput");
  const searchText = "";
  await t.typeText(searchInput, searchText);

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
test("FindProduct05", async (t) => {
  const searchInput = Selector("#searchProductInput");
  const searchText = "#!*@#&)(";
  await t.typeText(searchInput, searchText);

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
fixture("Product Variant Management").page("http://localhost:5173/");

test("CreateProductVariant01", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.click(productCard);

  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t.click(Selector("#addVariantButton"));

  const addVariantPopup = Selector(".popup");
  await t.expect(addVariantPopup.exists).ok();

  await t.typeText(Selector("#addVariantSKUInput"), "SKU123");
  await t.typeText(Selector("#addVariantBuyingPriceInput"), "10000");
  await t.typeText(Selector("#addVariantPriceInput"), "15000");
  await t.typeText(Selector("#addVariantColorInput"), "Yellow");
  await t.typeText(Selector("#addVariantSizeInput"), "120x60cm");

  await t.click(Selector("#confirmAddVariantButton"));

  const variantInfoSKU = Selector("#variantInfoSKU");
  await t.expect(variantInfoSKU.innerText).eql("SKU123");

  const variantInfoColor = Selector("#variantInfoColor");
  await t.expect(variantInfoColor.innerText).eql("Yellow");

  const variantInfoSize = Selector("#variantInfoSize");
  await t.expect(variantInfoSize.innerText).eql("120x60cm");

  const variantInfoPrice = Selector("#variantInfoPrice");
  await t.expect(variantInfoPrice.innerText).eql("10000");
});
test("CreateProductVariant02", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.click(productCard);

  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t.click(Selector("#addVariantButton"));

  const addVariantPopup = Selector(".popup");
  await t.expect(addVariantPopup.exists).ok();

  await t.typeText(Selector("#addVariantSKUInput"), "SKU123");
  await t.typeText(Selector("#addVariantBuyingPriceInput"), "10000");
  await t.typeText(Selector("#addVariantPriceInput"), "1");
  await t.typeText(Selector("#addVariantColorInput"), "Blue");
  await t.typeText(Selector("#addVariantSizeInput"), "150x50cm");

  await t.click(Selector("#confirmAddVariantButton"));

  const variantInfoSKU = Selector("#variantInfoSKU");
  await t.expect(variantInfoSKU.innerText).eql("SKU123");

  const variantInfoColor = Selector("#variantInfoColor");
  await t.expect(variantInfoColor.innerText).eql("Blue");

  const variantInfoSize = Selector("#variantInfoSize");
  await t.expect(variantInfoSize.innerText).eql("150x50cm");

  const variantInfoPrice = Selector("#variantInfoPrice");
  await t.expect(variantInfoPrice.innerText).eql("10000");
});
test("CreateProductVariant03", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.click(productCard);

  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t.click(Selector("#addVariantButton"));

  const addVariantPopup = Selector(".popup");
  await t.expect(addVariantPopup.exists).ok();

  await t.typeText(Selector("#addVariantSKUInput"), "SKU123");
  await t.typeText(Selector("#addVariantBuyingPriceInput"), "10000");
  await t.typeText(Selector("#addVariantPriceInput"), "15000");
  await t.typeText(Selector("#addVariantColorInput"), "");
  await t.typeText(Selector("#addVariantSizeInput"), "");

  await t.click(Selector("#confirmAddVariantButton"));

  const variantInfoSKU = Selector("#variantInfoSKU");
  await t.expect(variantInfoSKU.innerText).eql("SKU123");

  const variantInfoColor = Selector("#variantInfoColor");
  await t.expect(variantInfoColor.innerText).eql("");

  const variantInfoSize = Selector("#variantInfoSize");
  await t.expect(variantInfoSize.innerText).eql("");

  const variantInfoPrice = Selector("#variantInfoPrice");
  await t.expect(variantInfoPrice.innerText).eql("10000");
});

test("UpdateProductVariant01", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.click(productCard);

  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  await t.click(Selector("#updateVariantButton"));

  const addVariantPopup = Selector(".popup");
  await t.expect(addVariantPopup.exists).ok();

  const skuInput = Selector("#addVariantSKUInput");
  const buyingPriceInput = Selector("#addVariantBuyingPriceInput");
  const priceInput = Selector("#addVariantPriceInput");
  const colorInput = Selector("#addVariantColorInput");
  const sizeInput = Selector("#addVariantSizeInput");

  await t.selectText(skuInput).pressKey("delete").typeText(skuInput, "SKU456");
  await t
    .selectText(buyingPriceInput)
    .pressKey("delete")
    .typeText(buyingPriceInput, "20000");
  await t
    .selectText(priceInput)
    .pressKey("delete")
    .typeText(priceInput, "25000");
  await t
    .selectText(colorInput)
    .pressKey("delete")
    .typeText(colorInput, "Blue");
  await t
    .selectText(sizeInput)
    .pressKey("delete")
    .typeText(sizeInput, "Medium");

  await t.click(Selector("#confirmUpdateVariantButton"));

  const variantInfoSKU = Selector("#variantInfoSKU");
  await t.expect(variantInfoSKU.innerText).eql("SKU456");

  const variantInfoColor = Selector("#variantInfoColor");
  await t.expect(variantInfoColor.innerText).eql("Blue");

  const variantInfoSize = Selector("#variantInfoSize");
  await t.expect(variantInfoSize.innerText).eql("Medium");

  const variantInfoPrice = Selector("#variantInfoPrice");
  await t.expect(variantInfoPrice.innerText).eql("20000");
});

test("DeleteProductVariant01", async (t) => {
  const productCard = Selector("#productGallery .product-card").withText(
    "Bàn mặt đá Ceramic"
  );
  await t.click(productCard);

  const productDetailsPopup = Selector(".popup");
  await t.expect(productDetailsPopup.exists).ok();
  const variantInfoSKU = Selector("#variantInfoSKU");
  const oldSKU = await variantInfoSKU.innerText;
  const variantSelector = Selector("#variantSelector").nth(0);
  await t.click(variantSelector);

  await t.click(Selector("#deleteVariantButton"));

  const confirmDeleteVariantPopup = Selector(".confirmDeleteVariantPopup");
  await t.expect(confirmDeleteVariantPopup.exists).ok();
  await t.click(Selector("#confirmDeleteVariantButton"));

  await t.expect(variantInfoSKU.withText(oldSKU)).notOk();
});

fixture("Inventory Management").page("http://localhost:5173/inventory");

test("CreateImportOrder01", async (t) => {
  await t.click(Selector("#openImportPopupButton"));

  const importPopup = Selector(".popup");
  await t.expect(importPopup.exists).ok();

  await t.click(Selector("#selectedProduct"));
  await t.click(Selector("#selectedProduct option").withText("Đèn bàn"));
  await t.click(Selector("#selectedVariant"));
  await t.click(
    Selector("#selectedVariant option").withText("Xanh lá - 50 x 200")
  );
  await t.typeText(Selector("#importQuantity"), "10", { replace: true });

  await t.click(Selector("#addRowButton"));

  const variantRow = Selector(".MuiDataGrid-row").withText("Đèn bàn");
  await t.expect(variantRow.exists).ok();

  await t.typeText(Selector("#shippingCostInput"), "5000", { replace: true });

  await t.click(Selector("#confirmImportButton"));
});
test("CreateImportOrder02", async (t) => {
  await t.click(Selector("#openImportPopupButton"));

  const importPopup = Selector(".popup");
  await t.expect(importPopup.exists).ok();

  await t.click(Selector("#selectedProduct"));
  await t.click(Selector("#selectedProduct option").withText("Đèn bàn"));
  await t.click(Selector("#selectedVariant"));
  await t.click(
    Selector("#selectedVariant option").withText("Xanh lá - 50 x 200")
  );
  await t.typeText(Selector("#importQuantity"), "10", { replace: true });

  await t.click(Selector("#addRowButton"));

  const variantRow = Selector(".MuiDataGrid-row").withText("Đèn bàn");
  await t.expect(variantRow.exists).ok();

  await t.typeText(Selector("#shippingCostInput"), "5000", { replace: true });

  await t.click(Selector("#confirmImportButton"));
});
test("CreateImportOrder03", async (t) => {
  await t.click(Selector("#openImportPopupButton"));

  const importPopup = Selector(".popup");
  await t.expect(importPopup.exists).ok();

  await t.click(Selector("#selectedProduct"));
  await t.click(Selector("#selectedProduct option").withText("Đèn bàn"));
  await t.click(Selector("#selectedVariant"));
  await t.click(
    Selector("#selectedVariant option").withText("green - dài 25cm, rộng 30cm")
  );
  await t.typeText(Selector("#importQuantity"), "10", { replace: true });

  await t.click(Selector("#addRowButton"));

  const variantRow = Selector(".MuiDataGrid-row").withText("Đèn bàn");
  await t.expect(variantRow.exists).ok();

  await t.typeText(Selector("#shippingCostInput"), "5000", { replace: true });

  await t.click(Selector("#confirmImportButton"));
});

test("FindImportOrder01", async (t) => {
  await t.click(Selector("#openImportHistoryOrderPopupButton"));

  const importHistoryOrderPopup = Selector(".popup");
  await t.expect(importHistoryOrderPopup.exists).ok();

  const dataGrid = Selector(".MuiDataGrid-root");
  await t.expect(dataGrid.exists).ok();

  const searchID = "12345";
  await t.typeText(
    Selector(".MuiDataGrid-toolbar .MuiInputBase-input"),
    searchID,
    { replace: true }
  );

  const rows = dataGrid.find(".MuiDataGrid-row");
  const rowCount = await rows.count;
  await t.expect(rowCount).eql(1);

  const firstRowID = await rows.nth(0).find(".MuiDataGrid-cell").nth(1)
    .innerText;
  await t.expect(firstRowID).eql(searchID);
});
