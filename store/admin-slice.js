import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: { orders: [], updateAlert: {}, inputAlert: '', orders: [] },
    reducers: {
        getAllOrders(state, action) {
            state.orders = action.payload.items
        },
        setUpdateAlert(state, action) {
            state.updateAlert = action.payload.items
        },
        setInputAlert(state, action) {
            state.inputAlert = action.payload.items
        },
        setOrders(state, action) {
            state.orders = action.payload.items
        }
    }
});

export const adminActions = adminSlice.actions;

export default adminSlice;

