import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getLastPost, uploadImage } from "../../store/admin-actions";
import classes from './addBlogPost.module.css'

function getItemId(lastId) {

    let newId;

    if (lastId[1] === '0') {
        newId = (+lastId.slice(1, lastId.length) + 1)
    } else {
        newId = (+lastId.slice(0, lastId.length) + 1)
    }

    if (newId.toString().length === 3) {
        newId = 'i0' + newId.toString()
    } else if (newId.toString().length === 2) {
        newId = 'i00' + newId.toString()
    } else if (newId.toString().length === 1) {
        newId = 'i000' + newId.toString()
    } else {
        newId = 'i' + newId.toString()
    }

    return newId
}

function AddBlogPost() {

    const nameRef = useRef();
    const [category, setCategory] = useState('')
    const lastId = useSelector(state => state.blog.lastId);
    const afterInputMessage = useSelector(state => state.admin.inputAlert);
    const [newId, setNewId] = useState('');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
    const [imgUpload, setImgUpload] = useState()
    const descriptionRef = useRef();

    useEffect(() => {
        setNewId(getItemId(lastId))
    }, [lastId])

    useEffect(() => {
        dispatch(getLastPost())
        setShowAlert(false)
    }, [])

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        // console.log(nameRef.current.value, stockRef.current.value, priceRef.current.value, temp, category)

        const item = {
            id: newId,
            kategori: category,
            judul: nameRef.current.value,
            deskripsi: descriptionRef.current.value
        }

        await setIsLoading(true)
        if (item.judul.trim() !== '' && category !== '' && item.deskripsi.trim() !== '') {
            await dispatch(addPost(item))
            await dispatch(uploadImage(imgUpload, newId))
        }

        await setShowAlert(true);
        await setIsLoading(false)
    }

    const fileInputHandler = (e) => {
        const files = e.target.files

        setImgUpload(files)

    }

    useEffect(() => {
        if (afterInputMessage === 'Success') {
            setAlertMessage({ type: 'success', message: 'Post successfuly Posted!' })
        } else {
            setAlertMessage({ type: 'error', message: 'Failed to post!' })
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
                <h2><AiFillFileAdd /> Add New Post</h2>
            </div>
            <form className={classes.detailWrapper} onSubmit={formSubmitHandler} encType='multipart/form-data' >
                <div className={classes.sectionOne}>
                    <TextField id="outlined-basic" fullWidth label="Post Title" inputRef={nameRef} variant="outlined" />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="Post Description"
                        multiline
                        fullWidth
                        sx={{ marginTop: '2rem' }}
                        inputRef={descriptionRef}
                    />

                    {!imgUpload && (
                        <div className={classes.fileInput} >
                            <label htmlFor='myFile' >
                                <input id='myFile' name='myFile' type='file' style={{ display: 'none' }} onChange={fileInputHandler} />
                                <span>
                                    <div className={classes.uploadContainer}>
                                        <h4>Drag & drop product image here</h4>
                                        <Button variant="text" component='span' className={classes.uploadBtn} >Select Files</Button>
                                    </div>
                                </span>
                            </label>
                        </div>
                    )}
                    {imgUpload && (
                        <div className={classes.imagePreviewWrapper}>
                            <img className={classes.imgPreview} alt='preveiew image' src={imgUpload ? URL.createObjectURL(imgUpload[0]) : '#'} />
                            <label htmlFor='myFile' >
                                <input id='myFile' name='myFile' type='file' style={{ display: 'none' }} onChange={fileInputHandler} />
                                <span>
                                    <div className={classes.uploadContainer}>
                                        <h4>Select another file</h4>
                                        <Button variant="text" component='span' className={classes.uploadBtn} >Select Files</Button>
                                    </div>
                                </span>
                            </label>
                        </div>
                    )}
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
                    </div>
                    <Button variant='contained' type='submit' className={classes.submitBtn} disabled={isLoading} >Submit Post</Button>
                </div>
            </form>
        </div>
    )
}

export default AddBlogPost;