import { Button, Popover } from "@mui/material";
import CartItemCard from "../card/cartItem-card";
import classes from './cart-popover.module.css';

function CartPopover(props) {
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
                    <p>Rp 20.900</p>
                </div>
                <div className={classes.items}>
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                    <CartItemCard />
                </div>
                <div className={classes.footer}>
                    <Button variant="outlined" className={classes.btn} >Go to cart</Button>
                    <Button variant="contained" className={classes.btn}>Checkout</Button>
                </div>
            </div>
        </Popover>
    )
}

export default CartPopover;