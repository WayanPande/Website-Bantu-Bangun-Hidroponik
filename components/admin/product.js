import { Alert, Button, Divider, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Pagination, Select, Snackbar, TextField } from "@mui/material";
import { Fragment, useEffect, useRef, useState } from "react";
import { BsArrowRight, BsFillInboxFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../store/admin-actions";
import { getAllItems } from "../../store/product-actions";
import AdminProductCard from "../card/adminProduct-card";
import classes from './product.module.css'

const sliceItems = (items, maxPage) => {
    let finalItems = [];
    let prev = 0;
    let next = 6;

    for (let i = 0; i < maxPage; i++) {

        finalItems[i] = items.slice(prev, next);
        prev = next
        next = next + 6
    }

    return finalItems
}

const getDetailItem = (items, id) => {

    let finalItems;

    finalItems = items.filter(item => item.id === id);

    return finalItems[0]

}

function AdminProducts(props) {

    const dispatch = useDispatch();
    const productItems = useSelector(state => state.product.items);
    const alertType = useSelector(state => state.admin.updateAlert);
    const [page, setPage] = useState(1);
    const maxPage = productItems.length % 2 === 0 ? Math.floor(productItems.length / 5) : Math.round(productItems.length / 5)
    const [finalItems, setFinalItems] = useState([]);
    const [items, setItems] = useState([]);
    const [updatePage, setUpdatePage] = useState(false)
    const [category, setCategory] = useState('')
    const [temp, setTemp] = useState('')
    const [detailItem, setDetailItem] = useState({});
    const nameRef = useRef();
    const stockRef = useRef();
    const priceRef = useRef();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (detailItem) {
            setCategory(detailItem.kategori)
            setTemp(detailItem.suhu)
        }
    }, [detailItem])

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    const tempChange = (event) => {
        setTemp(event.target.value);
    };

    useEffect(() => {

        dispatch(getAllItems());

    }, [dispatch]);

    useEffect(() => {
        setFinalItems(sliceItems(productItems, maxPage))
    }, [productItems])

    useEffect(() => {
        if (finalItems.length !== 0) {
            setItems(finalItems[0])
        }
    }, [finalItems])

    const pageChangeHandler = (event, value) => {

        finalItems.forEach((item, i) => {
            if (i === value - 1) {
                setItems(item)
                return
            }
        });

        setPage(value)
    }

    const detailPageChangeHandler = () => {
        setUpdatePage(prevState => !prevState)
        setShowAlert(false);
    }

    const goToDetailPage = (id) => {
        setDetailItem(getDetailItem(productItems, id))
        setUpdatePage(prevState => !prevState)
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        // console.log(nameRef.current.value, stockRef.current.value, priceRef.current.value, temp, category)

        const item = {
            id: detailItem.id,
            kategori: category,
            nama: nameRef.current.value,
            harga: +priceRef.current.value,
            suhu: temp,
            stok: +stockRef.current.value
        }
        await setIsLoading(true)
        await dispatch(updateProduct(item))
        await setIsLoading(false)
        await setShowAlert(true);
        await dispatch(getAllItems());

    }

    useEffect(() => {
        if (alertType) {
            if (alertType.matchedCount === 1) {
                setAlertMessage({ type: 'success', message: 'Data successfuly updated!' })
            } else if (alertType.matchedCount === 0) {
                setAlertMessage({ type: 'error', message: 'Failed to update data!' })
            }
        }
    }, [alertType])

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
            {!updatePage && (
                <Fragment>
                    <div className={classes.header}>
                        <h2><BsFillInboxFill /> Products</h2>
                        <TextField id="outlined-basic" variant="outlined" placeholder='Search...' />
                    </div>
                    <div className={classes.main}>
                        <div className={classes.label}>
                            <p>Name</p>
                            <p>Stock</p>
                            <p>Price</p>
                            <IconButton sx={{ opacity: 0 }} disabled aria-label="delete">
                                <BsArrowRight />
                            </IconButton>
                        </div>
                        <div className={classes.cardWrapper}>
                            {items.map((item => <AdminProductCard key={item.id} id={item.id} title={item.nama} stock={item.stok} price={item.harga} onDetailClick={goToDetailPage} />))}
                        </div>
                        <Pagination className={classes.pagination} count={maxPage} variant="outlined" color="primary" onChange={pageChangeHandler} />
                    </div>
                </Fragment>
            )}
            {updatePage && (
                <Fragment>
                    {alert}
                    <div className={classes.header}>
                        <h2><BsFillInboxFill /> Edit Product</h2>
                        <Button variant="outlined" onClick={detailPageChangeHandler} >Back to product list</Button>
                    </div>
                    <form className={classes.detailWrapper} onSubmit={formSubmitHandler} >
                        <div className={classes.sectionOne}>
                            <TextField id="outlined-basic" fullWidth label="Product Name" defaultValue={detailItem.nama} inputRef={nameRef} focused variant="outlined" />
                            <div className={classes.inputWrapper} >
                                <TextField id="outlined-basic" fullWidth label="Stock" defaultValue={detailItem.stok} inputRef={stockRef} focused variant="outlined" />
                                <TextField id="outlined-basic" fullWidth label="Price" defaultValue={detailItem.harga} inputRef={priceRef} variant="outlined" type='number'
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
                                <TextField id="outlined-basic" disabled label={detailItem.id} variant="outlined" />
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
                            <Button variant='contained' type='submit' className={classes.submitBtn} disabled={isLoading} >Update Product</Button>
                        </div>
                    </form>
                </Fragment>
            )
            }
        </div >
    )
}

export default AdminProducts;