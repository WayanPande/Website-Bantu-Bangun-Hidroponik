import { Checkbox, Chip, FormControl, InputLabel, LinearProgress, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { IoReloadOutline } from 'react-icons/io5';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { getAllBlog } from '../../store/blog-actions';
import BlogCard from '../card/blog-card';
import { ArrowBtn } from '../ui/button';
import classes from './blog-carousel.module.css';


const categories = [
    'Media Tanam',
    'Bibit Tanaman',
    'Pupuk',
    'Alat Bantu',
    'Wadah Tanam',
];

function BlogCarousel(props) {

    const [progress, setProgress] = useState(1);
    const carouselControl = useRef();
    const dispatch = useDispatch();
    const allBlogPosts = useSelector(state => state.blog.items);
    const [blogPosts, setBlogPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const totalPost = blogPosts.filter(item => true).length;
    const MIN = 1;
    const MAX = totalPost;
    const normalize = value => ((value - MIN) * 100) / (MAX - MIN);

    useEffect(() => {
        console.log(blogPosts)
    }, [blogPosts])

    useEffect(() => {
        dispatch(getAllBlog());
    }, []);

    useEffect(() => {
        setBlogPosts(allBlogPosts);
    }, [allBlogPosts])

    useEffect(() => {
        if (tags.length >= 1) {
            setBlogPosts(
                allBlogPosts.filter(item => {
                    for (let category of tags) {
                        if (item.kategori === category.toLowerCase()) {
                            return true
                        }
                    }
                    return false
                })
            );
        } else {
            setBlogPosts(allBlogPosts);
        }
        setProgress(1);
    }, [tags])

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
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

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTags(value);
    };

    const tagRemoveHandler = (e) => () => {

        setTags((prevState) => {
            return prevState.filter(item => item !== e)
        })
    };

    const removeAllTags = () => {
        setTags([]);
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <h1>Our blog</h1>

                <FormControl className={classes.input} >
                    <Select
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        multiple
                        value={tags}
                        onChange={handleChange}
                        renderValue={(selected) => 'Tags'}
                    >
                        {categories.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={tags.includes(name)} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </div>
            {tags.length > 0 && (
                <div className={classes.chipContainer}>
                    <span className={classes.span}>Tags:</span>
                    {tags.map((item =>
                        <Chip className={classes.chip} label={item} onDelete={tagRemoveHandler(item)} />
                    ))}
                    {tags.length > 1 && <Chip className={classes.chipDeleteAll} label={'delete all filters'} onClick={removeAllTags} onDelete={removeAllTags} deleteIcon={<IoReloadOutline />} />}
                </div>
            )}
            <div className={classes.slider}>
                <Slider ref={carouselControl} {...settings}>
                    {blogPosts.map((item =>
                        <div className={classes.card}>
                            <BlogCard key={item.id} id={item.id} description={item.deskripsi} title={item.judul} category={item.kategori} />
                        </div>
                    ))}
                </Slider>
                {blogPosts.length < 1 && <p>No data</p>}
            </div>
            {totalPost >= 2 && (
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
            )}
        </div>
    )
}

export default BlogCarousel;