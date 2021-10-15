import { ArrowBtn } from '../ui/button';
import classes from './item-carousel.module.css';
import { MdArrowBackIosNew, MdArrowForwardIos, MdKeyboardArrowRight } from 'react-icons/md';
import ItemCard, { ItemCardLoading } from '../card/item-card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../store/product-actions';

function ItemCarousel(props) {

    const carouselControl = useRef();
    const productItems = useSelector(state => state.product.items);
    const isLoading = useSelector(state => state.ui.isLoading);
    const carouselType = props.type;
    let list;

    if (carouselType === 'popular') {
        list = productItems.filter(item => item.stok < 30);
    }

    if (carouselType === 'low-price') {
        list = productItems.filter(item => item.harga < 10000);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllItems());
    }, [dispatch]);

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        variableWidth: true,
        swipeToSlide: true,
        arrows: false
    };

    const nextCarouselHandler = () => {
        carouselControl.current.slickNext();
    }

    const prevCarouselHandler = () => {
        carouselControl.current.slickPrev();
    }

    return (
        <section>
            <div className={classes.header}>
                <div className={classes.title}>
                    <h2>{props.title}</h2>
                    <p>See all <MdKeyboardArrowRight /></p>
                </div>
                <div className={classes.ArrowBtn}>
                    <ArrowBtn onClick={prevCarouselHandler} ><MdArrowBackIosNew /></ArrowBtn>
                    <ArrowBtn onClick={nextCarouselHandler} ><MdArrowForwardIos /></ArrowBtn>
                </div>
            </div>
            {isLoading && (
                <Slider ref={carouselControl} {...settings}>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                    <div className={classes.card}>
                        <ItemCardLoading />
                    </div>
                </Slider>
            )}
            {!isLoading && (
                <Slider ref={carouselControl} {...settings}>
                    {list.map((item =>
                        <div className={classes.card}>
                            <ItemCard key={item.id} id={item.id} title={item.nama} cost={item.harga} />
                        </div>
                    ))}

                </Slider>
            )}

        </section >
    )
}

export default ItemCarousel;