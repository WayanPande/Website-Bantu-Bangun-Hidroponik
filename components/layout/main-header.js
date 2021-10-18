import { Badge, Button, OutlinedInput } from '@mui/material';
import classes from './main-header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CartPopover from '../popover/cart-popover';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

function MainHeader() {

    const totalCartItem = useSelector(state => state.cart.totalItem);
    const [showPopover, setShowPopover] = useState(null);
    const [session, loading] = useSession();

    const cartHandlerOpen = (e) => {
        setShowPopover(e.currentTarget);
    }

    const cartHandlerClose = () => {
        setShowPopover(null);
    }

    const logoutHandler = () => {
        signOut();
    }

    const open = Boolean(showPopover);
    const id = open ? 'simple-popover' : undefined;

    return (
        <header className={classes.header}>
            <Link href='/' >
                <a><img className={classes.img} src='images/Logo.jpg' alt='logo BBH' /></a>
            </Link>
            <form className={classes.form}>
                <OutlinedInput id="outlined-basic" size="small" className={classes.searchInput} variant="outlined" />
                <Button variant="contained" className={classes.btn}><AiOutlineSearch /></Button>
            </form>
            {session && !loading && (
                <div className={classes.badge}>
                    <Badge color="error" badgeContent={totalCartItem} >
                        <Button variant="contained" aria-describedby={id} onClick={cartHandlerOpen} className={classes.btn}><BsFillCartFill /></Button>
                    </Badge>
                    <CartPopover id={id} open={open} showPopover={showPopover} cartHandlerClose={cartHandlerClose} />
                </div>
            )}
            {!session && !loading && (
                <div className={classes.LoginRegisterBtn}>
                    <Button href='/auth/login' variant="outlined" className={classes.btn}>Login</Button>
                    <Button href='/auth/register' className={classes.registerBtn} variant="contained" className={classes.btn}>Register</Button>
                </div>
            )}
            {session && !loading && <Button onClick={logoutHandler} variant="outlined" className={classes.btnLogout}>Logout</Button>}
        </header>
    )
}

export default MainHeader;