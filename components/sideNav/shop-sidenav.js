import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkedCategoriesTagsHandler, countCategoriesTags } from '../../store/product-actions';
import classes from './shop-sidenav.module.css';



function ShopSideNav(props) {

    const [tags, setTags] = useState([]);
    const categoriesTags = useSelector(state => state.product.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.type === 'categories') {
            setTags(categoriesTags);
        } else {
            setTags(props.items)
        }
    }, [categoriesTags, props.type])


    const handleChange = (event) => {
        const checkbox = event.target.name;
        // const index = tags.findIndex((item => item.title === checkbox));

        dispatch(checkedCategoriesTagsHandler(tags, checkbox));
    };


    return (
        <div className={classes.container}>
            <h2>{props.title}</h2>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {tags.map((item =>
                        <div className={classes.checkbox}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={item.checked} onChange={handleChange} name={item.title} />
                                }
                                label={item.title}
                            />
                            <span>{item.sum}</span>
                        </div>
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default ShopSideNav;