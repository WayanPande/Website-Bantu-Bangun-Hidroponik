import { Chip } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';


const Modal = props => {

    const portalElement = document.getElementById('overlays');

    const blogPosts = useSelector(state => state.blog.items);

    let id = props.id;

    let post = blogPosts.filter(item => item.id === id);

    post = post[0];

    const modalCloseHandler = () => {
        props.onClose(null);
    }

    return (
        <Fragment>
            {ReactDOM.createPortal(<div className={classes.backdrop} onClick={modalCloseHandler} />, portalElement)}
            {ReactDOM.createPortal(
                <div className={classes.modalWrapper}>
                    <div className={classes.modal}>
                        <div className={classes.imgWrapper}>
                            <img src={`/images/informasi/${post.id}.jpg`} alt={post.judul} />
                        </div>
                        <div className={classes.contentWrapper}>
                            <div className={classes.chipWrapper}>
                                <Chip className={classes.chip} label={post.kategori} />
                                <div className={classes.closeIcon}>
                                    <GrClose />
                                </div>
                            </div>
                            <div className={classes.content}>
                                <h2>{post.judul}</h2>
                                <span>15.10.2021</span>
                            </div>
                            <div className={classes.description}>
                                <p>{post.deskripsi}</p>
                            </div>
                        </div>
                    </div>
                </div>
                , portalElement)}
        </Fragment>
    );
};

export default Modal;