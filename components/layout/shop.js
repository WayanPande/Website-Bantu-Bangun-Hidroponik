import { Divider } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countCategoriesTags, getAllItems } from '../../store/product-actions';
import ShopContent from '../shop/shop-content';
import ShopSideNav from '../sideNav/shop-sidenav';
import classes from './shop.module.css';

const InitialCategories = [
    { title: 'Media Tanam', checked: false, sum: 0 },
    { title: 'Bibit Tanaman', checked: false, sum: 0 },
    { title: 'Pupuk', checked: false, sum: 0 },
    { title: 'Alat Bantu', checked: false, sum: 0 },
    { title: 'Wadah Tanam', checked: false, sum: 0 },
];

const suhu = [
    { title: 'Tinggi', checked: false, sum: 21 },
    { title: 'Sedang', checked: false, sum: 12 },
    { title: 'Rendah', checked: false, sum: 20 },
];

function Shop(props) {

    const productItems = useSelector(state => state.product.items);
    const dispatch = useDispatch();

    if (productItems.length === 0) {
        dispatch(getAllItems());
    }

    useEffect(() => {
        dispatch(countCategoriesTags(InitialCategories, productItems));
    }, [dispatch, productItems, InitialCategories]);

    const suhuChange = (items) => {
        console.log(items)
    }

    return (
        <div className={classes.container}>
            <div className={classes.sideNav} >
                <ShopSideNav key={1} title='Categories' type='categories' />
                <Divider className={classes.divider} />
                <ShopSideNav key={2} title='Suhu' items={suhu} onChange={suhuChange} />
            </div>
            <div className={classes.main}>
                <ShopContent />
            </div>
        </div>
    )
}

export default Shop;