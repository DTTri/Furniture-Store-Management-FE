import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productVariants: [],
    products: [],
  },
  reducers: {
    setProductVariants: (state, action) => {
      state.productVariants = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProductVariants, setProducts } = productSlice.actions;

export default productSlice.reducer;
