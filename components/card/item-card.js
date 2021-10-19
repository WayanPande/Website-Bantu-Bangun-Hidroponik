import { CardCartBtn } from '../ui/button';
import classes from './item-card.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Skeleton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

function ItemCard(props) {

    const dispatch = useDispatch();
    const cost = formatMoneyOne(props.cost);
    const [session, loading] = useSession();
    const router = useRouter();

    const addToCart = () => {
        if (!session) {
            router.push('/auth/login');
        } else {
            dispatch(cartActions.addItem());
        }

    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.img}>
                <img src={`images/produk/${props.id}.jpg`} alt={props.title} />
            </div>
            <div className={classes.test}>
                <p className={classes.title}>{props.title}</p>
            </div>
            <div className={classes.footer}>
                <p>Rp {cost}</p>
                <CardCartBtn onClick={addToCart}>
                    <AiOutlineShoppingCart />
                </CardCartBtn>
            </div>
        </div>
    )
}

export function ItemCardLoading() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.imgLoading}>
                <Skeleton variant="rectangular" className={classes.skeletonImg} />
            </div>
            <div className={classes.titleLoading}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </div>
            <div className={classes.Skeletonfooter}>
                <Skeleton variant="text" className={classes.skeletonPrice} />
                <Skeleton variant="rectangular" className={classes.skeletonCart} />
            </div>
        </div>
    )
}

export default ItemCard;