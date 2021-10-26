import { IoCloseSharp } from 'react-icons/io5';
import { Button, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import CheckoutCard from '../card/checkout-card';
import classes from './checkout.module.css';

function Checkout() {

    const cartItems = useSelector(state => state.cart.items);
    let totalPrice = 0;
    let quantity = 0;
    let tax = 0;
    let subTotal = 0;

    if (cartItems.length > 0) {

        for (const item of cartItems[0].items) {
            totalPrice = totalPrice + item.price
            quantity = quantity + item.amount
        }
    }

    tax = totalPrice * (10 / 100)
    subTotal = formatMoneyOne(tax + totalPrice)
    tax = formatMoneyOne(totalPrice * (10 / 100))
    totalPrice = formatMoneyOne(totalPrice);

    return (
        <div className={classes.container}>
            <div className={classes.itemWrapper}>
                <div className={classes.itemHeader}>
                    <p>Products</p>
                    <div className={classes.labelWrapper}>
                        <div className={classes.label}>
                            <p>Quantity</p>
                            <span>{quantity}</span>
                        </div>
                        <div className={classes.label}>
                            <p>Total</p>
                            <span>Rp {totalPrice}</span>
                        </div>
                        <div className={classes.label}>
                            <p>Clear All</p>
                            <span><IoCloseSharp /></span>
                        </div>
                    </div>
                </div>
                {cartItems.length > 0 && cartItems[0].items.map((item =>

                    <CheckoutCard key={item.id} title={item.name} id={item.id} price={item.price} amount={item.amount} />

                ))}
            </div>
            <div className={classes.priceWrapper}>
                <div className={classes.priceContent}>
                    <h2>Rp {totalPrice}</h2>
                    <p>Total</p>
                </div>
                <Divider />
                <div className={classes.priceContent}>
                    <p>Tax</p>
                    <span>Rp {tax}</span>
                </div>
                <Divider />
                <div className={classes.priceContent}>
                    <p>Sub total</p>
                    <span>Rp {subTotal}</span>
                </div>
                <Divider />
                <div className={classes.priceContent}>
                    <p>Qty</p>
                    <span>{quantity}</span>
                </div>
                <Divider />
                <Button className={classes.payBtn} variant="contained">Pay</Button>
            </div>
        </div>
    )
}

export default Checkout;