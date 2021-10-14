import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalItem: 0 },
    reducers: {
        addItem(state, action) {
            state.totalItem++;
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;

