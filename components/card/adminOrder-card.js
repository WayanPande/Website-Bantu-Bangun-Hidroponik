import { Chip, IconButton } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';
import { formatDate } from '../../helpers/dateFormat';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import classes from './adminOrder-card.module.css';

function AdminOrderCard(props) {

    const humanReadableDate = formatDate(props.date)
    const humanReadablePrice = formatMoneyOne(props.totalPrice)

    const itemClicked = () => {
        props.onDetailClick(props.id)
    }

    let statusClasses;

    switch (props.status) {
        case 'pending':
            statusClasses = `${classes.pending}`
            break;
        case 'processing':
            statusClasses = `${classes.processing}`
            break;
        case 'delivered':
            statusClasses = `${classes.delivered}`
            break;
        case 'cancelled':
            statusClasses = `${classes.cancelled}`
            break;
        default:
            statusClasses = `${classes.pending}`
            break;
    }

    return (
        <div className={classes.wrapper} onClick={itemClicked}>
            <p>{props.id}</p>
            <p><Chip className={statusClasses} label={props.status} /></p>
            <p>{humanReadableDate}</p>
            <p>Rp {humanReadablePrice}</p>
            <IconButton aria-label="delete">
                <BsArrowRight />
            </IconButton>
        </div>
    )
}

export default AdminOrderCard;