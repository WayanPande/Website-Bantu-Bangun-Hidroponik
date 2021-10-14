import { Badge, Button, Input, OutlinedInput, Popover } from '@mui/material';
import classes from './main-header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CartPopover from '../popover/cart-popover';

function MainHeader() {

    const totalCartItem = useSelector(state => state.cart.totalItem);
    const [showPopover, setShowPopover] = useState(null);

    const cartHandlerOpen = (e) => {
        setShowPopover(e.currentTarget);
    }

    const cartHandlerClose = () => {
        setShowPopover(null);
    }

    const open = Boolean(showPopover);
    const id = open ? 'simple-popover' : undefined;

    return (
        <header className={classes.header}>
            <img className={classes.img} src='images/Logo.jpg' alt='logo BBH' />
            <form className={classes.form}>
                <OutlinedInput id="outlined-basic" size="small" className={classes.searchInput} variant="outlined" />
                <Button variant="contained" className={classes.btn}><AiOutlineSearch /></Button>
            </form>
            <div className={classes.badge}>
                <Badge color="error" badgeContent={totalCartItem} >
                    <Button variant="contained" aria-describedby={id} onClick={cartHandlerOpen} className={classes.btn}><BsFillCartFill /></Button>
                </Badge>
                <CartPopover id={id} open={open} showPopover={showPopover} cartHandlerClose={cartHandlerClose} />
            </div>
            {/* <div className={classes.LoginRegisterBtn}>
                <Button variant="outlined">Login</Button>
                <Button className={classes.registerBtn} variant="contained">Register</Button>
            </div> */}
        </header>
    )
}

export default MainHeader;