import { Chip } from '@mui/material';
import { MdKeyboardArrowRight } from 'react-icons/md';
import classes from './blog-card.module.css';
// import reactImageSize from 'react-image-size';
import { useEffect, useState } from 'react';

function BlogCard(props) {

    let input = 'Arang sekam (sekam yang sudah dibakar) merupakan sebuah media tanam yang populer digunakan oleh petani hidroponik. Media ini merpakan salah satu media tanam organik sehingga ramah lingkungan karena memiliki pH netral, memiliki daya ikat air yang cukup bagus, memiliki aerasi yang baik, dan steril dari bakteri dan cendawan. Media arang sekam umumnya digunakan untuk hidroponik, tomat, paprika, dan mentimun. Media arang sekam memiliki kelebihan, antara lain harga relatif murah, bahan mudah didapat, tergolong ringan, media lebih steril, dan memiliki porositas yang tinggi. Sedangkan untuk kekurangannya yaitu jarang tersedia di pasaran dan hanya dapat digunakan dua kali.'

    const truncate = (input) => input.length > 80 ? `${input.substring(0, 80)}...` : input;
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    let containerClass;
    let contentWrapperClass;
    let footerClass;


    // useEffect(() => {
    //     reactImageSize(props.img)
    //         .then(({ width, height }) => {
    //             setWidth(width);
    //             setHeight(height);
    //         })
    //         .catch((errorMessage) => console.log(errorMessage));
    // }, [])

    // console.log(width)
    if (width > height) {
        containerClass = `${classes.container} ${classes.potrait}`;
        contentWrapperClass = `${classes.contentWrapper}`;
        footerClass = `${classes.footer}`;
    } else if (width < height) {
        containerClass = `${classes.container}`;
        contentWrapperClass = `${classes.contentWrapperLandscape} ${classes.contentWrapper}`;
        footerClass = `${classes.footerLandscape}`;
    }

    return (
        <div className={containerClass}>
            <div className={classes.imgWrapper}>
                <img src={props.img} alt='Arang Sekam: Media Tanam Hidroponik' />
            </div>
            <div className={contentWrapperClass}>
                <div className={classes.chipWrapper}>
                    <Chip className={classes.chip} label="media tanam" />
                    <Chip className={classes.chip} label="bibit tanaman" />
                    <Chip className={classes.chip} label="pupuk" />
                </div>
                <div className={classes.content}>
                    <h2>Arang Sekam: Media Tanam Hidroponik</h2>
                    <p>{truncate(input)}</p>
                </div>
                <div className={footerClass}>
                    <span>15.10.2021</span>
                    <div className={classes.link}>
                        <span>More</span>
                        <MdKeyboardArrowRight />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BlogCard;