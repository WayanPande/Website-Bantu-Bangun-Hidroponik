import { LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllBlog } from '../../store/blog-actions';
import BlogCard from '../card/blog-card';
import { ArrowBtn } from '../ui/button';
import classes from './blog-carousel.module.css';

function BlogCarousel(props) {

    const [progress, setProgress] = useState(1);
    const carouselControl = useRef();
    const dispatch = useDispatch();
    const blogPosts = useSelector(state => state.blog.items);

    const totalPost = blogPosts.filter(item => true).length;
    const MIN = 1;
    const MAX = totalPost;
    const normalize = value => ((value - MIN) * 100) / (MAX - MIN);


    useEffect(() => {
        dispatch(getAllBlog());
    }, [])

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
        setProgress((prevState) => {
            if (prevState === MAX) {
                return MIN;
            }

            return Math.min(prevState + 1, MAX);
        });
        carouselControl.current.slickNext();
    }

    const prevCarouselHandler = () => {
        setProgress((prevState) => {
            if (prevState === 1) {
                return MAX;
            }

            return Math.max(prevState - 1, MIN);
        });
        carouselControl.current.slickPrev();
    }

    return (
        <div className={classes.container}>
            <div>
                <h1>Our blog</h1>
            </div>
            <div className={classes.slider}>
                <Slider ref={carouselControl} {...settings}>
                    {blogPosts.map((item =>
                        <div className={classes.card}>
                            <BlogCard key={item.id} id={item.id} description={item.deskripsi} title={item.judul} category={item.kategori} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className={classes.footer}>
                <div className={classes.progress}>
                    <LinearProgress variant="determinate" value={normalize(progress)} />
                </div>
                <div className={classes.ArrowBtn}>
                    <span>{progress}/{totalPost}</span>
                    <ArrowBtn key={1} onClick={prevCarouselHandler} ><MdArrowBackIosNew /></ArrowBtn>
                    <ArrowBtn key={2} onClick={nextCarouselHandler} ><MdArrowForwardIos /></ArrowBtn>
                </div>
            </div>
        </div>
    )
}

export default BlogCarousel;