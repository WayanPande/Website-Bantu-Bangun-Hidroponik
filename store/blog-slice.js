import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: { items: [] },
    reducers: {
        getAllBlogPosts(state, action) {
            state.items = action.payload.items
        }
    }
});

export const blogActions = blogSlice.actions;

export default blogSlice;