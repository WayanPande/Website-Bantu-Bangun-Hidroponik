import { Divider } from '@mui/material';
import ShopSideNav from '../sideNav/shop-sidenav';
import classes from './shop.module.css';

const categories = [
    { title: 'Media Tanam', checked: false, sum: 2 },
    { title: 'Bibit Tanaman', checked: false, sum: 12 },
    { title: 'Pupuk', checked: false, sum: 20 },
    { title: 'Alat Bantu', checked: false, sum: 13 },
    { title: 'Wadah Tanam', checked: false, sum: 5 },
];

const suhu = [
    { title: 'Tinggi', checked: false, sum: 21 },
    { title: 'Sedang', checked: false, sum: 12 },
    { title: 'Rendah', checked: false, sum: 20 },
];

function Shop(props) {

    const categoriesChange = (items) => {
        console.log(items)
    }

    const suhuChange = (items) => {
        console.log(items)
    }

    return (
        <div className={classes.container}>
            <div className={classes.sideNav} >
                <ShopSideNav title='Categories' items={categories} onChange={categoriesChange} />
                <Divider className={classes.divider} />
                <ShopSideNav title='Suhu' items={suhu} onChange={suhuChange} />
            </div>
            <div className={classes.main}>

            </div>
        </div>
    )
}

export default Shop;