import { Fragment } from 'react';
import styles from './Modal.module.css';


const Modal = props => {
    return (
        <Fragment>
            <div className={styles.backdrop} onClick={props.onClose} />
            <div className={styles.modal}>
                <div className={styles.content}>

                </div>
            </div>

        </Fragment>
    );
};

export default Modal;