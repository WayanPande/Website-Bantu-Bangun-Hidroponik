import { Chip } from '@mui/material';
import { MdKeyboardArrowRight } from 'react-icons/md';
import classes from './blog-card.module.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function BlogCard(props) {

    let description = props.description;

    const truncate = (input) => input.length > 80 ? `${input.substring(0, 80)}...` : input;
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const imgRef = useRef();
    const linkUrl = props.title.replace(/[^a-zA-Z0-9]/g, '-').replace(/--/g, '-').toLowerCase();
    let containerClass;
    let contentWrapperClass;
    let footerClass;

    useEffect(() => {
        setWidth(imgRef.current.naturalWidth);
        setHeight(imgRef.current.naturalHeight);
    }, []);

    if (width > height) {
        containerClass = `${classes.container} ${classes.potrait}`;
        contentWrapperClass = `${classes.contentWrapper}`;
        footerClass = `${classes.footer}`;
    } else if (width < height) {
        containerClass = `${classes.container}`;
        contentWrapperClass = `${classes.contentWrapperLandscape} ${classes.contentWrapper}`;
        footerClass = `${classes.footerLandscape}`;
    } else {
        containerClass = `${classes.container} ${classes.potrait}`;
        contentWrapperClass = `${classes.contentWrapper}`;
        footerClass = `${classes.footer}`;
    }

    const linkClickHandler = () => {
        props.onClick(linkUrl, props.id);
    }

    return (
        <div className={containerClass}>
            <div className={classes.imgWrapper}>
                <img ref={imgRef} src={`/images/informasi/${props.id}.jpg`} alt={props.title} />
            </div>
            <div className={contentWrapperClass}>
                <div className={classes.chipWrapper}>
                    <Chip className={classes.chip} label={props.category} />
                </div>
                <div className={classes.content}>

                    <h2 onClick={linkClickHandler} >{props.title}</h2>

                    <p>{truncate(description)}</p>
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