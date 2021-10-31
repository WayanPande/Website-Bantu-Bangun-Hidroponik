import classes from './dashboard.module.css';
import { MdDashboard } from 'react-icons/md'
import { Table, TableCell, TableHead, TableRow, TableBody, Divider, Chip, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrders } from '../../store/admin-actions';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import { IoIosArrowForward } from 'react-icons/io'

function AdminDashboard(props) {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.admin.orders);

    console.log(orders)

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const rows = orders.slice(0, 5);

    return (
        <div className={classes.container}>
            <h2 className={classes.title} ><MdDashboard /> Dashboard</h2>
            <div className={classes.cardWrapper}>
                <div className={classes.card}>
                    <p>Total Active Users</p>
                    <span>289</span>
                </div>
                <div className={classes.card}>
                    <p>Income</p>
                    <span>Rp 2.540.000</span>
                </div>
                <div className={classes.card}>
                    <p>Pending Orders</p>
                    <span>10</span>
                </div>
            </div>
            <div className={classes.orderTable}>
                <h3>New Order</h3>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right"><Chip label={row.status} className={classes.chip} /></TableCell>
                                <TableCell align="left">Rp {formatMoneyOne(row.totalPrice)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Divider />
                <div className={classes.buttonWrapper}>
                    <Button className={classes.btn} variant="text">View All <IoIosArrowForward /></Button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;