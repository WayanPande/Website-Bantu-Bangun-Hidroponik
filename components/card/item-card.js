import { CardCartBtn } from '../ui/button';
import classes from './item-card.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function ItemCard(props) {
    return (
        <div className={classes.wrapper}>
            <div className={classes.img}>
                <img src={`images/produk/${props.id}.jpg`} alt={props.title} />
            </div>
            <div className={classes.test}>
                <p className={classes.title}>{props.title}</p>
            </div>
            <div className={classes.footer}>
                <p>Rp {props.cost}</p>
                <CardCartBtn>
                    <AiOutlineShoppingCart />
                </CardCartBtn>
            </div>
        </div>
    )
}

export default ItemCard;