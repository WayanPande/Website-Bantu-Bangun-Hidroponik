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