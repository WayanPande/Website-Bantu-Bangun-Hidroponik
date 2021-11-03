import { Backdrop, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Pagination, Select } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { BsArrowRight, BsFillCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../helpers/dateFormat';
import { getAllOrders, updateOrderStatus } from '../../store/admin-actions';
import AdminOrderCard from '../card/adminOrder-card';
import OrderDetails from '../card/orderDetails';
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

const getDetailItem = (items, id) => {

    let finalItems;

    finalItems = items.filter(item => item._id === id);

    return finalItems[0]

}

function AdminOrders() {

    const dispatch = useDispatch();
    const allOrders = useSelector(state => state.admin.orders)
    const maxPage = allOrders.length % 2 !== 0 ? Math.round(allOrders.length / 4) : Math.floor(allOrders.length / 4)
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [finalItems, setFinalItems] = useState([]);
    const [detailPage, setDetailPage] = useState(false)
    const [status, setStatus] = useState('');
    const [detailPageItems, setDetailPageItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = async (event) => {
        const statusType = event.target.value
        await setIsLoading(true)
        await dispatch(updateOrderStatus(statusType, detailPageItems._id))
        await dispatch(getAllOrders())
        await setIsLoading(false)
        setStatus(event.target.value);
    };


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

        // console.log(value)

        setPage(value)
    }

    const goToDetailPage = (id) => {
        setDetailPageItems(getDetailItem(allOrders, id))
        setDetailPage(true)
    }

    const detailPageChangeHandler = () => {
        setDetailPage(false)
    }

    return (
        <div className={classes.container}>
            {!detailPage && (
                <Fragment>
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
                            {items.map((item => <AdminOrderCard key={item._id} id={item._id} status={item.status} date={item.date} totalPrice={item.totalPrice} onDetailClick={goToDetailPage} />))}
                        </div>
                        <Pagination className={classes.pagination} count={maxPage} variant="outlined" color="primary" onChange={pageChangeHandler} />
                    </div>
                </Fragment>
            )}
            {detailPage && (
                <Fragment>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div className={classes.header}>
                        <h2><BsFillCartFill /> Order Details</h2>
                        <Button variant='outlined' onClick={detailPageChangeHandler} >Back To Order List</Button>
                    </div>
                    <div className={classes.main} >
                        <div className={classes.headerWrapper} >
                            <div className={classes.detailHeader} >
                                <p>Order ID: <span>{detailPageItems._id}</span></p>
                                <p>Placed on: <span>{formatDate(detailPageItems.date)}</span></p>
                            </div>
                            <FormControl fullWidth className={classes.select} >
                                <InputLabel id="status">Order Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    defaultValue={detailPageItems.status}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'pending'}>Pending</MenuItem>
                                    <MenuItem value={'processing'}>Processing</MenuItem>
                                    <MenuItem value={'delivered'}>Delivered</MenuItem>
                                    <MenuItem value={'cancelled'}>Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.sectionOne}>
                            <div className={classes.itemsContainer}>
                                <h3>Items</h3>
                                <div className={classes.itemsScroll} >
                                    {detailPageItems.items.map((item => <OrderDetails key={item.id} title={item.name} amount={item.amount} />))}
                                </div>
                            </div>
                            <div className={classes.right}>
                                <div className={classes.customerContainer}>
                                    <h3>Customer Details</h3>
                                    <div>
                                        <div className={classes.customerDetail} >
                                            <p>Name: <span>{detailPageItems.name}</span></p>
                                        </div>
                                        <div className={classes.customerDetail} >
                                            <p>Phonenumber: <span>{detailPageItems.phoneNumber}</span></p>
                                        </div>
                                        <div className={classes.customerDetail} >
                                            <p>Email: <span>{detailPageItems.email}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.customerAddress} >
                                    <h3>Customer Address</h3>
                                    <div>
                                        <div className={classes.customerDetail} >
                                            <p>Address: <span>{detailPageItems.address}</span></p>
                                        </div>
                                        <div className={classes.customerDetail} >
                                            <p>Postalcode: <span>{detailPageItems.postalCode}</span></p>
                                        </div>
                                        <div className={classes.customerDetail} >
                                            <p>City: <span>{detailPageItems.city}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default AdminOrders;