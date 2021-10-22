import { Divider, InputBase, MenuItem, OutlinedInput, Select, TextField, Slider } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { formatMoneyOne } from '../../helpers/moneyFormat-util';
import ItemCard from '../card/item-card';
import classes from './shop-content.module.css';

const sortByItems = [
    'featured',
    'Price - low',
    'Price - high',
]

function valuetext(value) {
    return `${value}°C`;
}

const minDistance = 10;

function ShopContent() {

    const [sortBy, setSortBy] = useState([]);
    const [value1, setValue1] = useState([20000, 60000]);
    const productItems = useSelector(state => state.product.items);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSortBy(
            // On autofill we get a the stringified value.
            value
        );
    };

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
    };


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
                        <TextField id="outlined-basic" value={'Rp ' + formatMoneyOne(value1[0])} sx={{ paddingInline: '1rem' }} variant="standard" InputProps={{

                            disableUnderline: true, // <== added this
                        }} />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <TextField id="outlined-basic" value={'Rp ' + formatMoneyOne(value1[1])} sx={{ paddingInline: '1rem' }} variant="standard" InputProps={{

                            disableUnderline: true, // <== added this
                        }} />
                    </div>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        getAriaValueText={valuetext}
                        disableSwap
                        sx={{ paddingTop: '0', marginTop: '0' }}
                        min={1000}
                        max={300000}
                        step={500}
                    />
                </div>
            </div>
            <div className={classes.secondRow}>
                {productItems.map((item =>
                    <div className={classes.card}>
                        <ItemCard key={item.id} id={item.id} title={item.nama} cost={item.harga} isShopPage={true} />
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ShopContent;