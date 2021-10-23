import DUMMY_ITEMS, { DUMMY_BLOG } from "../dummy-item-data"
import { productActions } from "./product-slice"
import { uiActions } from "./ui-slice";

export const inputItems = () => {
    return async (dispatch) => {

        const reqBody = { items: DUMMY_BLOG };

        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
    }
}

export const getAllItems = () => {
    return async (dispatch) => {
        dispatch(uiActions.showLoading());
        const response = await fetch('/api/products');

        const data = await response.json();
        dispatch(productActions.getAllItems({
            items: data.items
        }));
        dispatch(uiActions.showLoading());
    }
}

export const countCategoriesTags = (InitialCategories, items) => {

    return (dispatch) => {
        let newState = InitialCategories;

        for (const item of items) {
            newState = newState.map(p => p.title.toLowerCase() === item.kategori ? { ...p, sum: p.sum + 1 } : p);
        }

        dispatch(productActions.setCategoriesTags({
            data: newState
        }))
    }
}

export const countSuhuTags = (InitialSuhuTags, items) => {

    return (dispatch) => {
        let newState = InitialSuhuTags;

        for (const item of items) {
            newState = newState.map(p => p.title.toLowerCase() === item.suhu ? { ...p, sum: p.sum + 1 } : p);
        }

        dispatch(productActions.setSuhuTags({
            data: newState
        }))
    }
}

export const checkedCategoriesTagsHandler = (prevState, checkbox) => {
    return (dispatch) => {

        const index = prevState.findIndex((item => item.title === checkbox));
        const isChecked = prevState[index].checked;

        const updatedTag = { ...prevState[index], checked: !isChecked };

        const updatedTags = [
            ...prevState.slice(0, index),
            updatedTag,
            ...prevState.slice(index + 1),
        ];

        dispatch(productActions.setCategoriesTags({
            data: updatedTags
        }));
    }
}

export const checkedSuhuTagsHandler = (prevState, checkbox) => {
    return (dispatch) => {

        const index = prevState.findIndex((item => item.title === checkbox));
        const isChecked = prevState[index].checked;

        const updatedTag = { ...prevState[index], checked: !isChecked };

        const updatedTags = [
            ...prevState.slice(0, index),
            updatedTag,
            ...prevState.slice(index + 1),
        ];

        dispatch(productActions.setSuhuTags({
            data: updatedTags
        }));
    }
}