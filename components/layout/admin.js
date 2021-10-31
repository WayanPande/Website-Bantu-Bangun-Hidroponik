
import { Fragment, useState } from 'react';
import AddProduct from '../admin/addProduct';
import AdminDashboard from '../admin/dashboard';
import AdminOrders from '../admin/orders';
import AdminProducts from '../admin/product';
import AdminSideNav from '../sideNav/admin-sidenav';
import classes from './admin.module.css';

function AdminLayout(props) {
    const [sideMenuType, setSideMenuType] = useState(0);

    const menuChangeHandler = (type) => {
        setSideMenuType(type)
    }

    return (
        <div>
            <AdminSideNav onChange={menuChangeHandler} />
            {sideMenuType === 0 && (
                <div style={{ marginLeft: 240, paddingInline: '3rem' }}>
                    <AdminDashboard />
                </div>
            )}
            {sideMenuType === 1 && (
                <div style={{ marginLeft: 240, paddingInline: '3rem' }}>
                    <AdminProducts />
                </div>
            )}
            {sideMenuType === 2 && (
                <div style={{ marginLeft: 240, paddingInline: '3rem' }}>
                    <AddProduct />
                </div>
            )}
            {sideMenuType === 3 && (
                <div style={{ marginLeft: 240, paddingInline: '3rem' }}>
                    <AdminOrders />
                </div>
            )}
        </div>
    )
}

export default AdminLayout;

