import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/admin-actions';
import { getAllItems } from '../../store/product-actions';
import classes from './adminProduct-card.module.css';

function AdminProductCard(props) {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const itemClicked = (e) => {
        if (e.target.id === 'wrapper') {
            props.onDetailClick(props.id)
        }
    }

    const deleteItemHandler = async () => {
        setOpen(false);
        await dispatch(deleteProduct(props.id))
        await dispatch(getAllItems());
    }

    const openDialog = () => {
        setOpen(true)
    }


    return (
        <div className={classes.wrapper} id='wrapper' onClick={itemClicked} >
            <p id='wrapper' >{props.title}</p>
            <p id='wrapper'>{props.stock}</p>
            <p id='wrapper'>Rp {props.price}</p>
            <IconButton aria-label="delete" onClick={openDialog} className={classes.deleteBtn} >
                <IoMdTrash />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this item?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you delete this item, you can no longer revert the change. This means you must
                        insert a new data, if you want to revert the changes.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={deleteItemHandler} variant='contained' color='error' autoFocus>
                        Remove Item
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AdminProductCard;