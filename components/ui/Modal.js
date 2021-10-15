import { Chip } from '@mui/material';
import { Fragment } from 'react';
import { GrClose } from 'react-icons/gr';
import classes from './Modal.module.css';



const Modal = props => {
    return (
        <Fragment>
            <div className={classes.backdrop} onClick={props.onClose} >
                <div className={classes.modal}>
                    <div className={classes.imgWrapper}>
                        <img src={`/images/informasi/i0003.jpg`} alt={props.title} />
                    </div>
                    <div className={classes.contentWrapper}>
                        <div className={classes.chipWrapper}>
                            <Chip className={classes.chip} label='wadah tanam' />
                            <div className={classes.closeIcon}>
                                <GrClose />
                            </div>
                        </div>
                        <div className={classes.content}>
                            <h2>Tanaman Kemangi Hidroponik</h2>
                            <span>15.10.2021</span>
                        </div>
                        <div className={classes.description}>
                            <p>Kemangi merupakan tanaman yang bisa tumbuh di iklim tropis dengan ketinggian diantara 0 hingga 5 mdpl. Tanaman ini banyak dimanfaatkan masyarakat Indonesia salah satunya sebagai tanaman herbal. Daun kemangi ini bisa tumbuh dengan cukup rimbun. Ciri khas lainnya adalah daunnya yang berwarna hijau muda. Kemangi ini juga memiliki bunga putih berukuran kecil. Budidaya kemangi dengan skala kecil rumah tangga bisa dilakukan dengan memanfaatkan barang bekas sebagai tempat tumbuh dengan menggunakan media tanam arang sekam dan cocopeat (secara hidroponik).</p>
                            <br />
                            <p>Kemangi merupakan tanaman yang bisa tumbuh di iklim tropis dengan ketinggian diantara 0 hingga 5 mdpl. Tanaman ini banyak dimanfaatkan masyarakat Indonesia salah satunya sebagai tanaman herbal. Daun kemangi ini bisa tumbuh dengan cukup rimbun. Ciri khas lainnya adalah daunnya yang berwarna hijau muda. Kemangi ini juga memiliki bunga putih berukuran kecil. Budidaya kemangi dengan skala kecil rumah tangga bisa dilakukan dengan memanfaatkan barang bekas sebagai tempat tumbuh dengan menggunakan media tanam arang sekam dan cocopeat (secara hidroponik).</p>
                            <p>Kemangi merupakan tanaman yang bisa tumbuh di iklim tropis dengan ketinggian diantara 0 hingga 5 mdpl. Tanaman ini banyak dimanfaatkan masyarakat Indonesia salah satunya sebagai tanaman herbal. Daun kemangi ini bisa tumbuh dengan cukup rimbun. Ciri khas lainnya adalah daunnya yang berwarna hijau muda. Kemangi ini juga memiliki bunga putih berukuran kecil. Budidaya kemangi dengan skala kecil rumah tangga bisa dilakukan dengan memanfaatkan barang bekas sebagai tempat tumbuh dengan menggunakan media tanam arang sekam dan cocopeat (secara hidroponik).</p>
                            <p>Kemangi merupakan tanaman yang bisa tumbuh di iklim tropis dengan ketinggian diantara 0 hingga 5 mdpl. Tanaman ini banyak dimanfaatkan masyarakat Indonesia salah satunya sebagai tanaman herbal. Daun kemangi ini bisa tumbuh dengan cukup rimbun. Ciri khas lainnya adalah daunnya yang berwarna hijau muda. Kemangi ini juga memiliki bunga putih berukuran kecil. Budidaya kemangi dengan skala kecil rumah tangga bisa dilakukan dengan memanfaatkan barang bekas sebagai tempat tumbuh dengan menggunakan media tanam arang sekam dan cocopeat (secara hidroponik).</p>
                            <p>Kemangi merupakan tanaman yang bisa tumbuh di iklim tropis dengan ketinggian diantara 0 hingga 5 mdpl. Tanaman ini banyak dimanfaatkan masyarakat Indonesia salah satunya sebagai tanaman herbal. Daun kemangi ini bisa tumbuh dengan cukup rimbun. Ciri khas lainnya adalah daunnya yang berwarna hijau muda. Kemangi ini juga memiliki bunga putih berukuran kecil. Budidaya kemangi dengan skala kecil rumah tangga bisa dilakukan dengan memanfaatkan barang bekas sebagai tempat tumbuh dengan menggunakan media tanam arang sekam dan cocopeat (secara hidroponik).</p>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default Modal;