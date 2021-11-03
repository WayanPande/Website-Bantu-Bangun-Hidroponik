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

        const body = { items: newItem, type: 'update-product' };

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

export function updateOrderStatus(status, id) {
    return async (dispatch) => {
        const item = {
            id,
            status
        }

        const body = { items: item, type: 'update-status' };

        const response = await fetch('/api/admin', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
    }
}

export function deleteProduct(id) {
    return async (dispatch) => {
        const body = { id: id, type: 'delete-product' };

        const response = await fetch('/api/admin', {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        console.log(data)
    }
}

export function uploadImage(file, id) {
    return async (dispatch) => {
        // const body = { id: id, type: 'delete-product' };

        const data = new FormData();
        data.append("file", file[0]);
        data.append('id', 'p0001')


        const response = await fetch('/api/admin/image', {
            method: 'POST',
            body: data,
        });

        const result = await response.json();

        const body = await { type: 'update-img-name', imgName: result.imgName, id: id };

        const responseSecond = await fetch('/api/admin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resultSecond = await responseSecond.json();

        console.log(resultSecond)
    }
}