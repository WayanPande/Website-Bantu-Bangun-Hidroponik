import { Chip } from '@mui/material';
import { Fragment } from 'react';
import { GrClose } from 'react-icons/gr';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';


const ModalBlogAdmin = props => {

    const portalElement = document.getElementById('overlays');

    const modalCloseHandler = () => {
        props.onClick()
    }

    return (
        <Fragment>
            {ReactDOM.createPortal(<div className={classes.backdrop} onClick={modalCloseHandler} />, portalElement)}
            {ReactDOM.createPortal(
                <div className={classes.modalWrapper}>
                    <div className={classes.modal}>
                        <div className={classes.imgWrapper}>
                            <div className={classes.imgWrapperFull}>
                                <img src={props.imgUpload ? URL.createObjectURL(props.imgUpload[0]) : '#'} alt={props.judul} />
                            </div>
                        </div>
                        <div className={classes.contentWrapper}>
                            <div className={classes.chipWrapper}>
                                <Chip className={classes.chip} label={props.kategori} />
                                <div onClick={modalCloseHandler} className={classes.closeIcon}>
                                    <GrClose />
                                </div>
                            </div>
                            <div className={classes.content}>
                                <h2>{props.judul}</h2>
                                <span>15.10.2021</span>
                            </div>
                            <div className={classes.description}>
                                <p>{props.deskripsi}</p>
                            </div>
                        </div>
                    </div>
                </div>
                , portalElement)}
        </Fragment>
    );
};

export default ModalBlogAdmin;