import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import productSlice from "./product-slice";
import uiSlice from "./ui-slice";


const store = configureStore({
    reducer: { product: productSlice.reducer, ui: uiSlice.reducer, cart: cartSlice.reducer }
});

export default store;