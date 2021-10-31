import { Alert, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getLastProduct } from "../../store/admin-actions";
import classes from './addProduct.module.css'

function getItemId(lastId) {

    let newId;

    if (lastId[1] === '0') {
        newId = (+lastId.slice(1, lastId.length) + 1)
    } else {
        newId = (+lastId.slice(0, lastId.length) + 1)
    }

    if (newId.toString().length === 3) {
        newId = 'p0' + newId.toString()
    } else if (newId.toString().length === 2) {
        newId = 'p00' + newId.toString()
    } else if (newId.toString().length === 1) {
        newId = 'p000' + newId.toString()
    } else {
        newId = 'p' + newId.toString()
    }

    return newId
}

function AddProduct() {

    const nameRef = useRef();
    const stockRef = useRef();
    const priceRef = useRef();
    const [category, setCategory] = useState('')
    const [temp, setTemp] = useState('')
    const lastId = useSelector(state => state.product.lastId);
    const afterInputMessage = useSelector(state => state.admin.inputAlert);
    const [newId, setNewId] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });

    useEffect(() => {
        setNewId(getItemId(lastId))
    }, [lastId])

    useEffect(() => {
        dispatch(getLastProduct())
        setShowAlert(false)
    }, [])

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    const tempChange = (event) => {
        setTemp(event.target.value);
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        // console.log(nameRef.current.value, stockRef.current.value, priceRef.current.value, temp, category)

        const item = {
            id: newId,
            kategori: category,
            nama: nameRef.current.value,
            harga: +priceRef.current.value,
            suhu: temp,
            stok: +stockRef.current.value
        }

        await setIsLoading(true)
        if (nameRef.current.value.trim() !== '' && stockRef.current.value.trim() !== '' && priceRef.current.value.trim() !== '' && temp !== '' && category !== '') {
            await dispatch(addProduct(item))
        }

        // console.log(item)
        await setShowAlert(true);
        await setIsLoading(false)
    }

    useEffect(() => {
        if (afterInputMessage === 'Success') {
            setAlertMessage({ type: 'success', message: 'Product successfuly Added!' })
        } else {
            setAlertMessage({ type: 'error', message: 'Failed to input product!' })
        }
    }, [afterInputMessage])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowAlert(false);
    };

    const alert = (
        <Snackbar open={showAlert} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
            <Alert variant="filled" severity={alertMessage.type} onClose={handleClose} className={classes.alert} sx={{ width: '100%' }}>
                {alertMessage.message}
            </Alert>
        </Snackbar>
    );

    return (
        <div className={classes.container}>
            {alert}
            <div className={classes.header}>
                <h2><AiFillFileAdd /> Add Product</h2>
            </div>
            <form className={classes.detailWrapper} onSubmit={formSubmitHandler} >
                <div className={classes.sectionOne}>
                    <TextField id="outlined-basic" fullWidth label="Product Name" inputRef={nameRef} variant="outlined" />
                    <div className={classes.inputWrapper} >
                        <TextField id="outlined-basic" fullWidth label="Stock" inputRef={stockRef} variant="outlined" type='number' />
                        <TextField id="outlined-basic" fullWidth label="Price" inputRef={priceRef} variant="outlined" type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                            }} />
                    </div>
                    <div className={classes.fileInput} >
                        <label htmlFor='upload' >
                            <input id='upload' name='upload' type='file' style={{ display: 'none' }} />
                            <span>
                                <div className={classes.uploadContainer}>
                                    <h4>Drag & drop product image here</h4>
                                    <Button variant="text" component='span' className={classes.uploadBtn} >Select Files</Button>
                                </div>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={classes.sectionTwo}>
                    <div className={classes.sectionTwoContent}>
                        <TextField id="outlined-basic" disabled label={newId} variant="outlined" />
                        <FormControl fullWidth className={classes.textInput} >
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={category}
                                label="Category"
                                onChange={categoryChange}
                            >
                                <MenuItem value={'media tanam'}>Media Tanam</MenuItem>
                                <MenuItem value={'bibit tanaman'}>Bibit Tanaman</MenuItem>
                                <MenuItem value={'pupuk'}>Pupuk</MenuItem>
                                <MenuItem value={'alat bantu'}>Alat Bantu</MenuItem>
                                <MenuItem value={'wadah tanam'}>Wadah Tanam</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={classes.textInput} >
                            <InputLabel id="temp">Temp</InputLabel>
                            <Select
                                labelId="temp"
                                id="temp"
                                value={temp}
                                label="Temp"
                                onChange={tempChange}
                            >
                                <MenuItem value={'tinggi'}>Tinggi</MenuItem>
                                <MenuItem value={'sedang'}>Sedang</MenuItem>
                                <MenuItem value={'rendah'}>Rendah</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button variant='contained' type='submit' className={classes.submitBtn} disabled={isLoading} >Submit Product</Button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct;