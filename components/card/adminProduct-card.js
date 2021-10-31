import { IconButton } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';
import classes from './adminProduct-card.module.css';

function AdminProductCard(props) {

    const itemClicked = () => {
        props.onDetailClick(props.id)
    }


    return (
        <div className={classes.wrapper} onClick={itemClicked}>
            <p>{props.title}</p>
            <p>{props.stock}</p>
            <p>Rp {props.price}</p>
            <IconButton aria-label="delete">
                <BsArrowRight />
            </IconButton>
        </div>
    )
}

export default AdminProductCard;