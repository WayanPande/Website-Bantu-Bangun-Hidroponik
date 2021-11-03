import classes from './orderDetail.module.css'


function OrderDetails(props) {
    return (
        <div className={classes.container} >
            <div className={classes.img} >
                <img src='images/favicon.png' alt='logo BBH' />
            </div>
            <p>{props.title}</p>
            <p>{props.amount} (pcs)</p>
        </div>
    )
}

export default OrderDetails