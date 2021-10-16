import { Chip } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../../store/modal-slice';


const Modal = props => {

    const portalElement = document.getElementById('overlays');

    const blogPosts = useSelector(state => state.blog.items);
    const blogId = useSelector(state => state.modal.blogId);
    let slug = useSelector(state => state.modal.slug);
    const dispatch = useDispatch();

    slug = slug.replace(/-/g, '');

    let post = blogPosts.filter(item => {

        const temp = item.judul.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        return temp === slug;

    });

    post = post[0];

    const modalCloseHandler = () => {
        dispatch(modalActions.setModal({
            slug: ''
        }));
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