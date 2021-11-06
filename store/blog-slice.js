import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: { items: [], lastId: '' },
    reducers: {
        getAllBlogPosts(state, action) {
            state.items = action.payload.items
        },
        updateLastId(state, action) {
            state.lastId = action.payload.id
        }
    }
});

export const blogActions = blogSlice.actions;

export default blogSlice;