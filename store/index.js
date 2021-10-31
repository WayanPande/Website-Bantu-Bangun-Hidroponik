import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./admin-slice";
import blogSlice from "./blog-slice";
import cartSlice from "./cart-slice";
import modalSlice from "./modal-slice";
import productSlice from "./product-slice";
import uiSlice from "./ui-slice";


const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        ui: uiSlice.reducer,
        cart: cartSlice.reducer,
        blog: blogSlice.reducer,
        modal: modalSlice.reducer,
        admin: adminSlice.reducer
    }
});

export default store;