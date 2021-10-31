import { createSlice } from '@reduxjs/toolkit';


const productSlice = createSlice({
    name: 'product',
    initialState: { items: [], categories: [], suhu: [], lastId: '' },
    reducers: {
        getAllItems(state, action) {
            state.items = action.payload.items;
        },
        setCategoriesTags(state, action) {

            state.categories = action.payload.data;

        },
        setSuhuTags(state, action) {

            state.suhu = action.payload.data;
        },
        updateLastId(state, action) {
            state.lastId = action.payload.id
        }
    }
});

export const productActions = productSlice.actions;

export default productSlice;

