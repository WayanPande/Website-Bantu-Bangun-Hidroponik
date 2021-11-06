import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import { BsFillInboxFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage, updatePost, uploadImage } from '../../store/admin-actions';
import { getAllBlog } from '../../store/blog-actions';
import BlogCard from '../card/blog-card';
import classes from './blogPosts.module.css'

const getDetailItem = (items, id) => {

    let finalItems;

    finalItems = items.filter(item => item.id === id);

    return finalItems[0]

}

function BlogPosts(props) {

    const allBlogPosts = useSelector(state => state.blog.items);
    const alertType = useSelector(state => state.admin.updateAlert);
    const [updatePage, setUpdatePage] = useState(false);
    const dispatch = useDispatch();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const [imgUpload, setImgUpload] = useState();
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [detailItem, setDetailItem] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });

    useEffect(() => {
        dispatch(getAllBlog());
    }, []);

    useEffect(() => {
        if (detailItem) {
            setCategory(detailItem.kategori)
        }
    }, [detailItem])

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };


    const updatePageHandler = () => {
        setUpdatePage(prevState => !prevState)
        setImgUpload()
    }

    const fileInputHandler = (e) => {
        const files = e.target.files

        setImgUpload(files)

    }

    const goToDetailPage = (id) => {
        setDetailItem(getDetailItem(allBlogPosts, id))
        setShowAlert(false);
        setUpdatePage(prevState => !prevState)
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const item = {
            id: detailItem.id,
            kategori: category,
            judul: titleRef.current.value,
            deskripsi: descriptionRef.current.value
        }

        await setIsLoading(true)
        await dispatch(updatePost(item))

        if (imgUpload) {
            await dispatch(deleteImage(detailItem.id))
            await dispatch(uploadImage(imgUpload, detailItem.id))
        }

        await setIsLoading(false)
        await setShowAlert(true);
        await dispatch(getAllBlog());
    }

    useEffect(() => {
        if (alertType) {
            if (alertType.matchedCount === 1) {
                setAlertMessage({ type: 'success', message: 'Post successfuly updated!' })
            } else if (alertType.matchedCount === 0) {
                setAlertMessage({ type: 'error', message: 'Failed to update post!' })
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
                        <h2><BsFillInboxFill /> Blog Posts</h2>
                        <TextField id="outlined-basic" variant="outlined" placeholder='Search...' />
                    </div>
                    <div className={classes.main} >
                        {allBlogPosts.map((item =>
                            <BlogCard key={item.id} id={item.id} description={item.deskripsi} title={item.judul} category={item.kategori} admin={true} onClick={goToDetailPage} />
                        ))}
                    </div>
                </Fragment>
            )}
            {updatePage && (
                <Fragment>
                    {alert}
                    <div className={classes.header}>
                        <h2><BsFillInboxFill /> Edit Post</h2>
                        <Button variant="outlined" onClick={updatePageHandler} >Back to Posts list</Button>
                    </div>
                    <form className={classes.detailWrapper} onSubmit={formSubmitHandler} >
                        <div className={classes.sectionOne}>
                            <TextField id="outlined-basic" fullWidth label="Post Title" defaultValue={detailItem.judul} inputRef={titleRef} variant="outlined" />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Post Description"
                                multiline
                                fullWidth
                                sx={{ marginTop: '2rem' }}
                                defaultValue={detailItem.deskripsi}
                                inputRef={descriptionRef}
                            />
                            <div className={classes.imagePreviewWrapper}>
                                <img className={classes.imgPreview} alt='preveiew image' src={imgUpload ? URL.createObjectURL(imgUpload[0]) : 'images/informasi/' + detailItem.id + '.jpg'} />
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
                            </div>
                            <Button variant='contained' type='submit' className={classes.submitBtn} disabled={isLoading} >Update Post</Button>
                        </div>
                    </form>
                </Fragment>
            )}
        </div>
    )
}

export default BlogPosts;
