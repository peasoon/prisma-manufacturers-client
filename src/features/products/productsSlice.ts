import { createSlice } from "@reduxjs/toolkit";
import { Product, productsApi } from "../../api/products";


interface InitialState {
  products: Product[] | null;
}

const initialState: InitialState = {
  products: null,
};

export const productsSlice = createSlice({
  name:'products',
  initialState,
  reducers:{},
  extraReducers:(builder)=> {
    builder
    .addMatcher(productsApi.endpoints.getAllProducts.matchFulfilled, (state, action) => {
      state.products = action.payload;
    })
  },
})