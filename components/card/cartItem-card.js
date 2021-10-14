import classes from './cartItem-card.module.css';
import { IoCloseSharp } from 'react-icons/io5';

function CartItemCard(props) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.closeBtn}>
                <IoCloseSharp />
            </div>
            <div className={classes.content}>
                <div className={classes.imgWrapper}>
                    <img src='images/produk/p0009.jpg' alt='Bibit Kacang Panjang' />
                </div>
                <div className={classes.title}>
                    <p>Bibit Kacang Panjang</p>
                    <span>Rp 2.000</span>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;