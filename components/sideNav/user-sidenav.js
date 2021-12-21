import { useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { IoBagHandle } from 'react-icons/io5';
import classes from './user-sidenav.module.css';
import Image from 'next/image';
import { useSession } from 'next-auth/client';

function UserSideNav(props) {

    const [sideMenu, setsideMenu] = useState('0');
    const [session, loading] = useSession();

    const sideMenuChangeHandler = (e) => {
        setsideMenu(e.target.id)
        props.onChange(e.target.id)
    }

    return (
        <div className={classes.container}>
            <div className={classes.profileHeader}>
                <div className={classes.profileImgWrapper}>
                    <div className={classes.profileImg}>
                        <Image src={`https://avatars.dicebear.com/api/avataaars/${session.user.name}.svg`} alt='User Profile Img' layout='fill' />
                    </div>
                </div>
                <p>{session.user.name.replace(/\s(.*)/g, "")}</p>
            </div>
            <div className={classes.linkWrapper}>
                <div id='0' className={`${classes.link} ${sideMenu === '0' ? classes.active : ''}`} onClick={sideMenuChangeHandler}>
                    <BsPersonFill />
                    <p id='0'>User Info</p>
                </div>
                <div id='1' className={`${classes.link} ${sideMenu === '1' ? classes.active : ''}`} onClick={sideMenuChangeHandler}>
                    <IoBagHandle />
                    <p id='1' >Transaction Info</p>
                </div>
            </div>
        </div>
    )
}

export default UserSideNav;