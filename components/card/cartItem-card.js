import classes from './cartItem-card.module.css';
import { IoCloseSharp } from 'react-icons/io5';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import { getAllItems, removeItem } from '../../store/cart-actions';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';

function CartItemCard(props) {

    const price = formatMoneyOne(props.price)
    const dispatch = useDispatch();
    const [session, loading] = useSession();

    const deleteItemHandler = () => {
        (async () => {
            if (session) {
                await dispatch(removeItem(props.id, session.user.email))
                await dispatch(getAllItems(session.user.email))
            }
        })()
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.closeBtn} onClick={deleteItemHandler}>
                <IoCloseSharp />
            </div>
            <div className={classes.content}>
                <div className={classes.imgWrapper}>
                    <img src={`images/produk/${props.id}.jpg`} alt={props.title} />
                </div>
                <div className={classes.title}>
                    <p>{props.title}</p>
                    <span>Rp {price} ({props.amount} pc.)</span>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;