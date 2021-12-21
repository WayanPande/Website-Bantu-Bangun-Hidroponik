import classes from './user-info.module.css';
import { useSession } from "next-auth/client";
import Image from 'next/image';

function UserInfo(props) {

    const [session, loading] = useSession();

    return (
        <div className={classes.container}>
            <div>
                <h3>Account Information</h3>
                <div className={classes.contentContainer}>
                    <div className={classes.profileImgWrapper}>
                        <div className={classes.profileImg}>
                            <Image src={`https://avatars.dicebear.com/api/avataaars/${session.user.name}.svg`} alt='User Profile Img' layout='fill' />
                        </div>
                    </div>
                    <div className={classes.content}>
                        <p>{session.user.name}</p>
                        <p>{session.user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;