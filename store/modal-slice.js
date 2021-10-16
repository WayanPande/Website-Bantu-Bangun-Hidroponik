import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: { slug: '', showModal: false },
    reducers: {
        setModal(state, action) {
            state.slug = action.payload.slug;

            state.showModal = !state.showModal;
        }
    }
});

export const modalActions = modalSlice.actions;

export default modalSlice;

