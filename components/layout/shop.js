import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countCategoriesTags, countSuhuTags, getAllItems } from '../../store/product-actions';
import ShopContent from '../shop/shop-content';
import ShopSideNav from '../sideNav/shop-sidenav';
import classes from './shop.module.css';
import { getAllItems as getAllCartItems, setSearchButtonClicked } from '../../store/cart-actions';
import { useSession } from 'next-auth/client';

const InitialCategories = [
    { title: 'Media Tanam', checked: false, sum: 0 },
    { title: 'Bibit Tanaman', checked: false, sum: 0 },
    { title: 'Pupuk', checked: false, sum: 0 },
    { title: 'Alat Bantu', checked: false, sum: 0 },
    { title: 'Wadah Tanam', checked: false, sum: 0 },
];

const initialSuhu = [
    { title: 'Tinggi', checked: false, sum: 0 },
    { title: 'Sedang', checked: false, sum: 0 },
    { title: 'Rendah', checked: false, sum: 0 },
];

function setItemsCategories(items, categories) {

    const selectedCategories = categories.filter(category => category.checked);

    if (selectedCategories.length === 0) {
        return items
    }

    const filteredItems = items.filter(item => {
        for (const category of selectedCategories) {

            if (item.kategori === category.title.toLowerCase()) {
                return true
            }
        }
        return false
    })

    return filteredItems;
}

function setItemsSuhu(items, temps) {

    const selectedTemps = temps.filter(temp => temp.checked);

    if (selectedTemps.length === 0) {
        return items
    }

    const filteredItems = items.filter(item => {
        for (const temp of selectedTemps) {

            if (item.suhu === temp.title.toLowerCase()) {
                return true
            }
        }
        return false
    })

    return filteredItems;
}


function setItemsSortBy(type, items) {

    let filteredItems = [...items];

    if (type === 'Price - low') {
        filteredItems.sort(function (a, b) {
            if (a.harga > b.harga) {
                return 1;
            }
            if (a.harga < b.harga) {
                return -1;
            }
            return 0;
        })
    } else if (type === 'Price - high') {
        filteredItems.sort(function (a, b) {
            if (a.harga > b.harga) {
                return -1;
            }
            if (a.harga < b.harga) {
                return 1;
            }
            return 0;
        })
    }

    return filteredItems
}

function filterPrice(min, max, items) {
    let filteredItems = [...items];

    filteredItems = items.filter(item => item.harga >= min && item.harga <= max);

    return filteredItems

}

function shopHandler(categories, suhu, sortByType, items, priceRange) {

    let filteredItems;

    filteredItems = setItemsCategories(items, categories);
    filteredItems = setItemsSuhu(filteredItems, suhu);
    filteredItems = setItemsSortBy(sortByType, filteredItems);
    filteredItems = filterPrice(priceRange[0], priceRange[1], filteredItems)

    return filteredItems;
}

function searchHandler(items, searchVal) {
    return items.filter(item => item.nama.toLowerCase().includes(searchVal.toLowerCase()))
}


function Shop(props) {

    const productItems = useSelector(state => state.product.items);
    const categoriesTags = useSelector(state => state.product.categories);
    const searchValue = useSelector(state => state.cart.searchValue);
    const suhuTags = useSelector(state => state.product.suhu);
    const searchButton = useSelector(state => state.cart.searchButton);
    const [session, loading] = useSession();
    const [items, setItems] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [sortType, setSortType] = useState('');
    const dispatch = useDispatch();
    const maxPrice = productItems.length > 0 ? setItemsSortBy('Price - high', productItems)[0].harga : 150000;
    const minPrice = productItems.length > 0 ? setItemsSortBy('Price - high', productItems)[productItems.length - 1].harga : 100;


    useEffect(() => {
        console.log(productItems)
        if (productItems.length === 0) {
            dispatch(getAllItems())
        }
    }, [])

    useEffect(() => {
        if (session) {
            dispatch(getAllCartItems(session.user.email))
        }
    }, [session])

    useEffect(() => {
        setItems(productItems)
    }, [productItems])

    useEffect(() => {
        // console.log(categoriesTags)
        // const initial = categoriesTags.length === 0 ? InitialCategories : categoriesTags

        let initial = categoriesTags.filter(item => item.checked)

        if (initial.length > 0) {
            initial = categoriesTags // ini gara2 cuk
        } else {
            initial = InitialCategories
        }

        dispatch(countCategoriesTags(initial, productItems));
    }, [dispatch, productItems, InitialCategories]);

    useEffect(() => {
        dispatch(countSuhuTags(initialSuhu, productItems));
    }, [dispatch, productItems, initialSuhu]);



    // categories change
    useEffect(() => {

        let filteredItems = shopHandler(categoriesTags, suhuTags, sortType, productItems, priceRange)

        setItems(filteredItems)

    }, [categoriesTags, suhuTags, sortType, productItems, priceRange]);



    const sortByItems = (type) => {
        setSortType(type)
    }

    const filterPriceHandler = (price) => {

        setPriceRange(price)

    }

    useEffect(() => {
        if (searchButton) {
            setItems(searchHandler(productItems, searchValue))
            dispatch(setSearchButtonClicked());
        }
    }, [searchButton])


    return (
        <div className={classes.container}>
            <div className={classes.sideNav} >
                <ShopSideNav key={'categories'} title='Categories' type='categories' />
                <Divider className={classes.divider} />
                <ShopSideNav key={'suhu'} title='Suhu' type='suhu' />
            </div>
            <div className={classes.main}>
                <ShopContent items={items} sortBy={sortByItems} maxPrice={maxPrice} minPrice={minPrice} filterPrice={filterPriceHandler} />
            </div>
        </div>
    )
}

export default Shop;