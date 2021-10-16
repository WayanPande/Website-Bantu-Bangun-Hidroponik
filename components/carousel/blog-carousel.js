import { LinearProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllBlog } from '../../store/blog-actions';
import BlogCard from '../card/blog-card';
import { ArrowBtn } from '../ui/button';
import classes from './blog-carousel.module.css';

function BlogCarousel(props) {

    const [progress, setProgress] = useState(10);
    const [slug, setSlug] = useState('');
    const [id, setId] = useState();
    const carouselControl = useRef();
    const dispatch = useDispatch();
    const router = useRouter();
    const blogPosts = useSelector(state => state.blog.items);
    let counter = 0;
    let OutputBLogPosts = [];

    const totalPost = blogPosts.filter(item => true).length;

    blogPosts.forEach(item => {
        if (counter === 10) {
            return
        } else {
            OutputBLogPosts.push(item);
            counter++;
        }
    })

    useEffect(() => {
        if (slug !== '') {
            router.push('/?blog=' + slug, undefined, { shallow: true })
            props.onClick(id);
        }
    }, [slug, id])


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
        carouselControl.current.slickNext();
        setProgress((prevState) => {
            if (prevState >= 100) {
                return 10;
            }

            return prevState + 10
        });
    }

    const prevCarouselHandler = () => {
        carouselControl.current.slickPrev();
        setProgress((prevState) => {
            if (prevState <= 10) {
                return 100;
            }

            return prevState - 10
        });
    }

    const blogUrl = (slug, id) => {
        // console.log('ID from: ' + id, 'SLug: ' + slug)

        setSlug(slug);
        setId(id);
    }

    return (
        <div className={classes.container}>
            <div>
                <h1>Our blog</h1>
            </div>
            <div className={classes.slider}>
                <Slider ref={carouselControl} {...settings}>
                    {OutputBLogPosts.map((item =>
                        <div className={classes.card}>
                            <BlogCard onClick={blogUrl} id={item.id} description={item.deskripsi} title={item.judul} category={item.kategori} />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className={classes.footer}>
                <div className={classes.progress}>
                    <LinearProgress variant="determinate" value={progress} />
                </div>
                <div className={classes.ArrowBtn}>
                    <span>{progress / 10}/10</span>
                    <ArrowBtn onClick={prevCarouselHandler} ><MdArrowBackIosNew /></ArrowBtn>
                    <ArrowBtn onClick={nextCarouselHandler} ><MdArrowForwardIos /></ArrowBtn>
                </div>
            </div>
        </div>
    )
}

export default BlogCarousel;