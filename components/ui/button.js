import { Button } from "@mui/material";
import classes from './button.module.css';

export function ArrowBtn(props) {
    return (
        <Button onClick={props.onClick} variant="outlined" className={classes.arrow}>
            {props.children}
        </Button>
    );
}

export function CardCartBtn(props) {
    return (
        <Button type='button' variant='contained' className={classes.cart} >
            {props.children}
        </Button>
    )
}

function MyButton(props) {
    return (
        <Button type='button' variant='contained' className={classes.btn} >
            {props.children}
        </Button>
    )
}

export default MyButton;