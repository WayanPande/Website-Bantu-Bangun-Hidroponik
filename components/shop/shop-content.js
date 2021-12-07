import { Divider, InputBase, MenuItem, OutlinedInput, Select, TextField, Slider, Chip, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import { checkedCategoriesTagsHandler, checkedSuhuTagsHandler } from '../../store/product-actions';
import ItemCard from '../card/item-card';
import classes from './shop-content.module.css';

const sortByItems = [
    'featured',
    'Price - low',
    'Price - high',
]

const sliceItems = (items, maxPage) => {
    let finalItems = [];
    let prev = 0;
    let next = 16;

    for (let i = 0; i < maxPage; i++) {

        finalItems[i] = items.slice(prev, next);
        prev = next
        next = next + 16
    }

    return finalItems
}

const minDistance = 10;

function ShopContent(props) {

    const [sortBy, setSortBy] = useState([]);
    const [priceRange, setPriceRange] = useState([props.minPrice, props.maxPrice]);
    const categoriesTags = useSelector(state => state.product.categories);
    const suhuTags = useSelector(state => state.product.suhu);
    const productItems = props.items;
    const dispatch = useDispatch();
    const [maxPage, setMaxPage] = useState(Math.ceil(productItems.length / 16))
    const [finalItems, setFinalItems] = useState([]);
    const [items, setItems] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSortBy(
            // On autofill we get a the stringified value.
            value
        );
    };

    useEffect(() => {
        props.filterPrice(priceRange)
    }, [priceRange])

    useEffect(() => {
        props.sortBy(sortBy)
    }, [sortBy])

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
        } else {
            setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
        }
    };


    const checkTagsCategory = (name) => {

        let categories;
        let suhu;

        for (const category of categoriesTags) {
            if (category.title === name) {
                categories = true;
                break;
            }
            categories = false;
        }

        for (const temp of suhuTags) {
            if (temp.title === name) {
                suhu = true;
                break;
            }
            suhu = false;
        }

        if (categories) {
            dispatch(checkedCategoriesTagsHandler(categoriesTags, name));
        }

        if (suhu) {
            dispatch(checkedSuhuTagsHandler(suhuTags, name));
        }

    }

    const tagRemoveHandler = (e) => () => {

        checkTagsCategory(e)

        // dispatch(checkedCategoriesTagsHandler(categoriesTags, e));
    }

    const pageChangeHandler = (event, value) => {

        finalItems.forEach((item, i) => {
            if (i === value - 1) {
                setItems(item)
                return
            }
        });
    }

    useEffect(() => {
        setFinalItems(sliceItems(productItems, maxPage))
        setMaxPage(Math.ceil(productItems.length / 16))
    }, [productItems, maxPage])

    useEffect(() => {
        if (finalItems.length !== 0) {
            setItems(finalItems[0])
            // if (finalItems[finalItems.length - 1].length === 0) {
            //     setMaxPage(prevState => prevState - 1)
            // }
        }
    }, [finalItems])

    return (
        <div className={classes.container}>
            <div className={classes.firstRow}>
                <div>
                    <h3>Sort by</h3>
                    <form>
                        <Select
                            value={sortBy}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.input}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>Select </em>
                            </MenuItem>
                            {sortByItems.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </form>
                </div>
                <div>
                    <h3>Price</h3>
                    <div className={classes.priceInput}>
                        <TextField id="outlined-basic" value={'Rp ' + formatMoneyOne(priceRange[0])} sx={{ paddingInline: '1rem' }} variant="standard" InputProps={{

                            disableUnderline: true, // <== added this
                        }} />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <TextField id="outlined-basic" value={'Rp ' + formatMoneyOne(priceRange[1])} sx={{ paddingInline: '1rem' }} variant="standard" InputProps={{

                            disableUnderline: true, // <== added this
                        }} />
                    </div>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={priceRange}
                        onChange={handleChange1}

                        disableSwap
                        sx={{ paddingTop: '0', marginTop: '0' }}
                        min={props.minPrice}
                        max={props.maxPrice}
                        step={500}
                    />
                </div>
            </div>
            <div className={classes.chipContainer}>

                {categoriesTags.map(category => category.checked ? <Chip key={category.title} className={classes.chip} label={category.title} onDelete={tagRemoveHandler(category.title)} /> : '')}
                {suhuTags.map(suhu => suhu.checked ? <Chip key={suhu.title} className={classes.chip} label={suhu.title} onDelete={tagRemoveHandler(suhu.title)} /> : '')}

            </div>
            <div className={classes.secondRow}>
                {items.map((item =>
                    <div key={item.id} className={classes.card}>
                        <ItemCard key={item.id} id={item.id} title={item.nama} cost={item.harga} isShopPage={true} />
                    </div>
                ))}
            </div>
            <Pagination className={classes.pagination} count={maxPage} color="primary" shape="rounded" size="large" onChange={pageChangeHandler} />
        </div>
    )
}



export default ShopContent;