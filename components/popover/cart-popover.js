import { Button, Popover } from "@mui/material";
import { useSelector } from "react-redux";
import { formatMoneyOne } from "../../helpers/moneyFormat-util";
import CartItemCard from "../card/cartItem-card";
import classes from './cart-popover.module.css';
import Link from 'next/link';

function CartPopover(props) {
    const cartItems = useSelector(state => state.cart.items);
    let totalPrice = 0;

    if (cartItems.length > 0) {

        for (const item of cartItems[0].items) {
            totalPrice = totalPrice + item.price
        }
    }

    totalPrice = formatMoneyOne(totalPrice)

    return (
        <Popover
            id={props.id}
            open={props.open}
            anchorEl={props.showPopover}
            onClose={props.cartHandlerClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}

        >
            <div className={classes.popover}>
                <div className={classes.balance}>
                    <p>Your cart: </p>
                    <p>Rp {totalPrice}</p>
                </div>
                <div className={classes.items}>
                    {cartItems.length === 0 && <p className='center' >Your Cart Is Empty</p>}
                    {cartItems.length > 0 && cartItems[0].items.map((item =>

                        <CartItemCard title={item.name} key={item.id} id={item.id} price={item.price} amount={item.amount} />

                    ))}

                </div>
                <div className={classes.footer}>
                    <Link href='/cart' ><Button variant="contained" href='/cart' className={classes.btn} >Go to cart</Button></Link>
                </div>
            </div>
        </Popover>
    )
}

export default CartPopover;