import { IconButton, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { BsArrowRight, BsFillCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../store/admin-actions';
import AdminOrderCard from '../card/adminOrder-card';
import classes from './orders.module.css'

const sliceItems = (items, maxPage) => {
    let finalItems = [];
    let prev = 0;
    let next = 5;

    for (let i = 0; i < maxPage; i++) {

        finalItems[i] = items.slice(prev, next);
        prev = next
        next = next + 5
    }

    return finalItems
}

function AdminOrders() {

    const dispatch = useDispatch();
    const allOrders = useSelector(state => state.admin.orders)
    const maxPage = allOrders.length % 2 !== 0 ? Math.round(allOrders.length / 4) : Math.floor(allOrders.length / 4)
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [finalItems, setFinalItems] = useState([]);

    console.log(items)

    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    useEffect(() => {
        setFinalItems(sliceItems(allOrders, maxPage))
    }, [allOrders])

    useEffect(() => {
        if (finalItems.length !== 0) {
            setItems(finalItems[0])
        }
    }, [finalItems])

    const pageChangeHandler = (event, value) => {

        finalItems.forEach((item, i) => {
            if (i === value - 1) {
                setItems(item)
                return
            }
        });

        setPage(value)
    }

    const orderDetailHandler = () => {

    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h2><BsFillCartFill /> Orders</h2>
            </div>
            <div className={classes.main}>
                <div className={classes.label}>
                    <p>Order #</p>
                    <p>Status</p>
                    <p>Date purchased</p>
                    <p>Total</p>
                    <IconButton sx={{ opacity: 0 }} disabled aria-label="delete">
                        <BsArrowRight />
                    </IconButton>
                </div>
                <div className={classes.cardWrapper}>
                    {items.map((item => <AdminOrderCard key={item._id} id={item._id} status={item.status} date={item.date} totalPrice={item.totalPrice} onDetailClick={orderDetailHandler} />))}
                </div>
                <Pagination className={classes.pagination} count={maxPage} variant="outlined" color="primary" onChange={pageChangeHandler} />
            </div>
        </div>
    )
}

export default AdminOrders;