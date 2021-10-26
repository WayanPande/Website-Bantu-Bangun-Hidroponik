import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalItem: 0 },
    reducers: {
        getAllCartItems(state, action) {
            state.items = action.payload.items
            state.totalItem = action.payload.count
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;

