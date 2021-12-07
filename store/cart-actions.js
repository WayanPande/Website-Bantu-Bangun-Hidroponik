import { cartActions } from "./cart-slice";

export const getAllItems = (email) => {
    return async (dispatch) => {

        const reqBody = { email: email, type: 'get-items' };


        const response = await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        let reseivedData = data.items;
        let numberOfItems;

        if (reseivedData.length !== 0) {

            numberOfItems = reseivedData[0].items.length
        }

        if (numberOfItems === 0) {
            numberOfItems = 0
        }

        dispatch(cartActions.getAllCartItems({
            items: reseivedData,
            count: numberOfItems
        }));

    }
}

export function addItemsCart(productItem, email, cartItems) {
    return async (dispatch) => {

        const newItem = {
            email,
            items: [
                productItem
            ]
        }

        const existingUser = cartItems.findIndex(
            (user) => user.email === email
        );


        if (existingUser !== -1) {
            // check if there is already an item in cart
            const existingCartItemIndex = cartItems[existingUser].items.findIndex(
                (item) => item.id === newItem.items[0].id
            );
            if (existingCartItemIndex !== -1) {

                const existingCartItem = cartItems[existingUser].items[existingCartItemIndex]


                let updatedItems;
                let updatedCartItems;

                if (existingCartItem) {
                    const updatedItem = {
                        ...existingCartItem,
                        amount: existingCartItem.amount + productItem.amount,
                        price: existingCartItem.price + productItem.price
                    }
                    updatedItems = [...cartItems[existingUser].items];
                    updatedItems[existingCartItemIndex] = updatedItem

                    const updatedCartItem = {
                        ...cartItems[existingUser],
                        items: [
                            ...cartItems[existingUser].items.slice(0, existingCartItemIndex),
                            updatedItem,
                            ...cartItems[existingUser].items.slice(existingCartItemIndex + 1, cartItems[existingUser].items.length),
                        ]
                    }

                    updatedCartItems = updatedCartItem
                }

                const reqBody = { items: updatedCartItems, type: 'add-item' };

                const response = await fetch('/api/cart', {
                    method: 'PUT',
                    body: JSON.stringify(reqBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                console.log(data)
            } else {

                const reqBody = { items: newItem, type: 'new-item' };

                const response = await fetch('/api/cart', {
                    method: 'POST',
                    body: JSON.stringify(reqBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                console.log(data)
            }
        } else {
            const reqBody = { items: newItem, type: 'new-user' };

            const response = await fetch('/api/cart', {
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
}

export function decreaseItemsCart(productItem, email, cartItems) {
    return async (dispatch) => {

        const newItem = {
            email,
            items: [
                productItem
            ]
        }

        const existingUser = cartItems.findIndex(
            (user) => user.email === email
        );


        // check if there is already an item in cart
        const existingCartItemIndex = cartItems[existingUser].items.findIndex(
            (item) => item.id === newItem.items[0].id
        );


        const existingCartItem = cartItems[existingUser].items[existingCartItemIndex]


        let updatedItems;
        let updatedCartItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
                price: existingCartItem.price - productItem.price
            }
            updatedItems = [...cartItems[existingUser].items];
            updatedItems[existingCartItemIndex] = updatedItem

            const updatedCartItem = {
                ...cartItems[existingUser],
                items: [
                    ...cartItems[existingUser].items.slice(0, existingCartItemIndex),
                    updatedItem,
                    ...cartItems[existingUser].items.slice(existingCartItemIndex + 1, cartItems[existingUser].items.length),
                ]
            }

            updatedCartItems = updatedCartItem
        }

        const reqBody = { items: updatedCartItems, type: 'add-item' };

        const response = await fetch('/api/cart', {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data)

    }
}

export function removeItem(id, email) {
    return async (dispatch) => {

        const reqBody = { email: email, id: id };

        const response = await fetch('/api/cart', {
            method: 'DELETE',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data)

    }
}

export function checkoutItems(items) {

    return async (dispatch) => {
        const reseivedItems = items;

        const newItem = {
            email: reseivedItems.email,
            items: []
        }

        const reqBody = { items: reseivedItems, type: 'checkout' };

        console.log(reseivedItems.email)

        const response = await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data)

        if (data.message === 'Success') {
            // update product stok
            for (const product of reseivedItems.items) {
                const bodyItem = { id: product.id, amount: product.amount * -1, type: 'reduce-amount' }

                const response = await fetch('/api/cart', {
                    method: 'PUT',
                    body: JSON.stringify(bodyItem),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                console.log(data)
            }

            // remove all item from cart
            const newCartItems = { items: newItem, type: 'add-item' };

            const response = await fetch('/api/cart', {
                method: 'PUT',
                body: JSON.stringify(newCartItems),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            console.log(data)
        }

    }
}

export function setSearchInput(value) {
    return (dispatch) => {
        dispatch(cartActions.setSearchValue({
            value
        }))
    }
}

export function setSearchButtonClicked() {
    return (dispatch) => {
        dispatch(cartActions.triggerSearchInput())
    }
}

