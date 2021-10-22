import { Avatar, Badge, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, OutlinedInput, Tooltip } from '@mui/material';
import classes from './main-header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Fragment, useState } from 'react';
import CartPopover from '../popover/cart-popover';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { IoLogOut, IoSettings } from 'react-icons/io5';

function MainHeader() {

    const totalCartItem = useSelector(state => state.cart.totalItem);
    const [showPopover, setShowPopover] = useState(null);
    const [session, loading] = useSession();

    const [anchorEl, setAnchorEl] = useState(null);
    const openProfile = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
            {session && !loading && (
                <Fragment>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ bgcolor: 'black' }} alt={session.user.name} src={`https://avatars.dicebear.com/api/avataaars/${session.user.name}.svg`} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorEl}
                        open={openProfile}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                boxShadow: '(rgba(149, 157, 165, 0.2) 0px 8px 24px)',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar alt={session.user.name} src={`https://avatars.dicebear.com/api/avataaars/${session.user.name}.svg`} /> {session.user.name}
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <IoSettings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={logoutHandler} >
                            <ListItemIcon>
                                <IoLogOut fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Fragment>
            )}
        </header>
    )
}

export default MainHeader;