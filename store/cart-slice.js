import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], totalItem: 0, alertMessage: false, searchValue: '', searchButton: false },
    reducers: {
        getAllCartItems(state, action) {
            state.items = action.payload.items
            state.totalItem = action.payload.count
        },
        showMessage(state) {
            state.alertMessage = !state.alertMessage
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload.value
        },
        triggerSearchInput(state) {
            state.searchButton = !state.searchButton
        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;

