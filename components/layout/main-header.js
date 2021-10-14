import { Badge, Button, Input, OutlinedInput } from '@mui/material';
import classes from './main-header.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillCartFill } from 'react-icons/bs';

function MainHeader() {
    return (
        <header className={classes.header}>
            <img className={classes.img} src='images/Logo.jpg' alt='logo BBH' />
            <form className={classes.form}>
                <OutlinedInput id="outlined-basic" size="small" className={classes.searchInput} variant="outlined" />
                <Button variant="contained" className={classes.btn}><AiOutlineSearch /></Button>
            </form>
            <div className={classes.badge}>
                <Badge color="error" badgeContent={10} >
                    <Button variant="contained" className={classes.btn}><BsFillCartFill /></Button>
                </Badge>
            </div>
            <div className={classes.LoginRegisterBtn}>
                <Button variant="outlined">Login</Button>
                <Button className={classes.registerBtn} variant="contained">Register</Button>
            </div>
        </header>
    )
}

export default MainHeader;