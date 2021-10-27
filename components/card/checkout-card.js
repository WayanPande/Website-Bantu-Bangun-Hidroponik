import { Divider } from '@mui/material';
import { useSession } from 'next-auth/client';
import { Fragment, useEffect, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import { addItemsCart, decreaseItemsCart, getAllItems, removeItem } from '../../store/cart-actions';
import classes from './checkout-card.module.css';

function CheckoutCard(props) {

    const totalPrice = formatMoneyOne(props.price)
    const [quantity, setQuantity] = useState(props.amount);
    const cartItems = useSelector(state => state.cart.items);
    const productItems = useSelector(state => state.product.items);
    const dispatch = useDispatch();
    const [session, loading] = useSession();

    const basePrice = productItems.filter(item => item.id === props.id);


    const quantityChangeHandler = (e) => {

        if (e.target.innerHTML === '+') {
            setQuantity(prevState => prevState + 1)
        } else {
            if (quantity === 1) {
                return;
            } else {
                setQuantity(prevState => prevState - 1)
            }
        }

    }

    useEffect(() => {
        if (session && basePrice.length !== 0) {
            (async () => {
                if (quantity > props.amount) {
                    await dispatch(addItemsCart({
                        id: props.id,
                        name: props.title,
                        amount: 1,
                        price: basePrice[0].harga
                    }, session.user.email, cartItems));
                } else if (quantity < props.amount) {
                    await dispatch(decreaseItemsCart({
                        id: props.id,
                        name: props.title,
                        amount: 1,
                        price: basePrice[0].harga
                    }, session.user.email, cartItems));
                }
                await dispatch(getAllItems(session.user.email))
            })()
        }
    }, [quantity])


    const deleteItemHandler = () => {
        (async () => {
            if (session) {
                await dispatch(removeItem(props.id, session.user.email))
                await dispatch(getAllItems(session.user.email))
            }
        })()
    }

    return (
        <Fragment>
            <div className={classes.container}>
                <div className={classes.itemWrapper}>
                    <div className={classes.img}>
                        <img src={`images/produk/${props.id}.jpg`} alt={props.title} />
                    </div>
                    <p>{props.title}</p>
                </div>
                <div className={classes.content}>
                    <div className={classes.buttonWrapper}>
                        <button onClick={quantityChangeHandler}>-</button>
                        <input readOnly type='number' value={quantity} min='0' />
                        <button onClick={quantityChangeHandler} >+</button>
                    </div>
                    <p>Rp {totalPrice}</p>
                    <span onClick={deleteItemHandler} ><IoCloseSharp /></span>
                </div>
            </div>
            <Divider variant="middle" />
        </Fragment>
    )
}

export default CheckoutCard;