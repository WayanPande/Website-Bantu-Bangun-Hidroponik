import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import classes from './shop-sidenav.module.css';



function ShopSideNav(props) {

    const [tags, setTags] = useState(props.items);

    useEffect(() => {
        props.onChange(tags);
    }, [tags]);


    const handleChange = (event) => {
        const checkbox = event.target.name;
        // const index = tags.findIndex((item => item.title === checkbox));

        setTags((prevState) => {
            const index = prevState.findIndex((item => item.title === checkbox));
            const isChecked = prevState[index].checked;

            const updatedTag = { ...prevState[index], checked: !isChecked };

            const updatedTags = [
                ...prevState.slice(0, index),
                updatedTag,
                ...prevState.slice(index + 1),
            ];

            return updatedTags
        });
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