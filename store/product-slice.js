import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
    name: 'product',
    initialState: { items: [], categories: [] },
    reducers: {
        getAllItems(state, action) {
            state.items = action.payload.items;
        },
        setCategoriesTags(state, action) {

            state.categories = action.payload.data;

        }
    }
});

export const productActions = productSlice.actions;

export default productSlice;

