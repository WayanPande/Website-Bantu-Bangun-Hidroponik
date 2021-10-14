import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { isLoading: false },
    reducers: {
        showLoading(state) {
            state.isLoading = !state.isLoading
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;