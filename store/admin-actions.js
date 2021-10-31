import { adminActions } from "./admin-slice";
import { productActions } from "./product-slice";

export function getOrders() {
    return async (dispatch) => {
        const response = await fetch('/api/admin');

        const data = await response.json();
        dispatch(adminActions.getAllOrders({
            items: data.items
        }));
    }
}


export function updateProduct(items) {
    return async (dispatch) => {

        const newItem = items;

        const body = { items: newItem };

        const response = await fetch('/api/admin', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        dispatch(adminActions.setUpdateAlert({
            items: data.items
        }))
        console.log(data.items)

    }
}

export function addProduct(items) {
    return async (dispatch) => {

        const newItem = items;

        const body = { items: newItem, type: 'insert-product' };

        const response = await fetch('/api/admin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (data.message === 'Success') {
            dispatch(productActions.updateLastId({
                id: newItem.id
            }))
        }
        dispatch(adminActions.setInputAlert({
            items: data.message
        }))


        console.log(data)

    }
}

export function getLastProduct() {
    return async (dispatch) => {
        const body = { type: 'get-last-product' };

        const response = await fetch('/api/admin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        dispatch(productActions.updateLastId({
            id: data.items[0].id
        }))
        console.log(data)

    }
}


export function getAllOrders() {
    return async (dispatch) => {
        const body = { type: 'get-all-orders' };

        const response = await fetch('/api/admin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        dispatch(adminActions.setOrders({
            items: data.items
        }))
    }
}