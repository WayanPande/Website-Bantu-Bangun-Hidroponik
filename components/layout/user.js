import { Fragment, useState } from "react";
import UserSideNav from "../sideNav/user-sidenav";
import UserInfo from "../user/user-info";
import classes from './user.module.css';

function User(props) {

    const [layout, setLayout] = useState('0')

    const layoutChangeHandler = (e) => {
        setLayout(e)
    }

    return (
        <Fragment>
            <div className={classes.backdrop}></div>
            <div className={classes.container}>
                <UserSideNav onChange={layoutChangeHandler} />
                {layout === '0' && (<UserInfo />)}

            </div>
        </Fragment>
    )
}

export default User;

