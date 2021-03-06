import { Avatar, Badge, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, OutlinedInput, Tooltip } from '@mui/material';
import classes from './main-header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useRef, useState } from 'react';
import CartPopover from '../popover/cart-popover';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { IoLogOut, IoPersonSharp, IoSettings } from 'react-icons/io5';
import { getAllItems, setSearchButtonClicked, setSearchInput } from '../../store/cart-actions';
import { useRouter } from 'next/router';

function MainHeader() {

    const totalCartItem = useSelector(state => state.cart.totalItem);
    const cartItems = useSelector(state => state.cart.items);
    const [showPopover, setShowPopover] = useState(null);
    const [btnIsHighLighted, setBtnIsHighLighted] = useState(false);
    const searchValue = useSelector(state => state.cart.searchValue);
    const [session, loading] = useSession();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const router = useRouter();
    const searchRef = useRef();
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

    useEffect(() => {
        if (session) {
            dispatch(getAllItems(session.user.email))
        }
    }, [session, dispatch])

    useEffect(() => {
        setBtnIsHighLighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighLighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartItems])

    const open = Boolean(showPopover);
    const id = open ? 'simple-popover' : undefined;

    const cartBtnClasses = `${classes.badge} ${btnIsHighLighted ? classes.bump : ''}`

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(setSearchButtonClicked());
        if (router.pathname !== '/shop') {
            router.push('/shop')
        }
    }

    const searchInputChangeHandler = (e) => {
        dispatch(setSearchInput(e.target.value))
    }


    return (
        <header className={classes.header}>
            <Link href='/' >
                <a><img className={classes.img} src='/images/Logo.jpg' alt='logo BBH' /></a>
            </Link>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <OutlinedInput id="outlined-basic" size="small" value={searchValue ? searchValue : ''} onChange={searchInputChangeHandler} className={classes.searchInput} inputRef={searchRef} variant="outlined" />
                <Button type='submit' variant="contained" className={classes.btn}><AiOutlineSearch /></Button>
            </form>

            <div className={cartBtnClasses}>
                <Badge color="error" badgeContent={totalCartItem} showZero >
                    <Button variant="contained" aria-describedby={id} onClick={cartHandlerOpen} className={classes.btn}><BsFillCartFill /></Button>
                </Badge>
                <CartPopover id={id} open={open} showPopover={showPopover} cartHandlerClose={cartHandlerClose} />
            </div>

            {!session && !loading && (
                <div className={classes.LoginRegisterBtn}>
                    <IconButton href='/auth/login' size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ bgcolor: '#1976d2' }}>
                            <IoPersonSharp />
                        </Avatar>
                    </IconButton>
                </div>
            )}
            {session && !loading && (
                <Fragment>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ bgcolor: '#1976d2' }} alt={session.user.name} src={`https://avatars.dicebear.com/api/avataaars/${session.user.name}.svg`} />
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
                        <Link href="/user" >
                            <MenuItem>
                                <Avatar alt={session.user.name} src={`https://avatars.dicebear.com/api/avataaars/${session.user.name}.svg`} /> {session.user.name}
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link href="/user" >
                            <MenuItem>
                                <ListItemIcon>
                                    <IoSettings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                        </Link>
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