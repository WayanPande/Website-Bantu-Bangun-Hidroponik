import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Fragment, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { ImDrawer2 } from 'react-icons/im';
import { FaBlogger } from 'react-icons/fa'
import { BsFillCartFill, BsFillFileEarmarkPostFill } from 'react-icons/bs';
import classes from './admin-sidenav.module.css';

function AdminSideNav(props) {

    const [sideMenu, setSideMenu] = useState(0);

    const navbarClickHandler = (e) => () => {
        props.onChange(e);
        setSideMenu(e);
    }


    const drawer = (
        <div>
            <div className={classes.imgWrapper}>
                <img className={classes.img} src='images/Logo.jpg' alt='logo BBH' />
            </div>
            <Divider />
            <List>
                {['Dashboard', 'Products', 'Add New Product', 'Orders', 'Blog Posts', 'Add New Post'].map((text, index) => (
                    <ListItem button key={text} onClick={navbarClickHandler(index)} className={`${sideMenu === index ? classes.sideNavButtonActive : ''}`}>
                        <ListItemIcon className={classes.sideNavIcon}>
                            {index === 0 && <MdDashboard className={`${sideMenu === index ? classes.iconActive : ''}`} />}
                            {index === 1 && <ImDrawer2 className={`${sideMenu === index ? classes.iconActive : ''}`} />}
                            {index === 2 && <AiFillFileAdd className={`${sideMenu === index ? classes.iconActive : ''}`} />}
                            {index === 3 && <BsFillCartFill className={`${sideMenu === index ? classes.iconActive : ''}`} />}
                            {index === 4 && <FaBlogger className={`${sideMenu === index ? classes.iconActive : ''}`} />}
                            {index === 5 && <BsFillFileEarmarkPostFill className={`${sideMenu === index ? classes.iconActive : ''}`} />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Fragment>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Fragment>
    )
}

export default AdminSideNav;

