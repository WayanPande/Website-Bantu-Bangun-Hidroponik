import { LinearProgress } from '@mui/material';
import { useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import Slider from 'react-slick';
import BlogCard from '../card/blog-card';
import { ArrowBtn } from '../ui/button';
import classes from './blog-carousel.module.css';

function BlogCarousel(props) {

    const [progress, setProgress] = useState(0);
    const carouselControl = useRef();

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        variableWidth: true,
        swipeToSlide: true,
        arrows: false
    };


    const nextCarouselHandler = () => {
        carouselControl.current.slickNext();
        setProgress((prevState) => {
            if (prevState === 100) {
                return 0;
            }

            return prevState + 10
        });
    }

    const prevCarouselHandler = () => {
        carouselControl.current.slickPrev();
        setProgress((prevState) => {
            if (prevState === 0) {
                return 0;
            }

            return prevState - 10
        });
    }

    return (
        <div className={classes.container}>
            <div>
                <h1>Our blog</h1>
            </div>
            <div className={classes.slider}>
                <Slider ref={carouselControl} {...settings}>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0001.jpg' />
                    </div>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0002.jpg' />
                    </div>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0003.jpg' />
                    </div>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0004.jpg' />
                    </div>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0005.jpg' />
                    </div>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0006.jpg' />
                    </div>
                    <div className={classes.card}>
                        <BlogCard img='/images/informasi/i0007.jpg' />
                    </div>
                </Slider>
            </div>
            <div className={classes.footer}>
                <div className={classes.progress}>
                    <LinearProgress variant="determinate" value={progress} />
                </div>
                <div className={classes.ArrowBtn}>
                    <ArrowBtn onClick={prevCarouselHandler} ><MdArrowBackIosNew /></ArrowBtn>
                    <ArrowBtn onClick={nextCarouselHandler} ><MdArrowForwardIos /></ArrowBtn>
                </div>
            </div>
        </div>
    )
}

export default BlogCarousel;