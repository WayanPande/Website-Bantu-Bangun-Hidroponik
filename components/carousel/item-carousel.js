import { ArrowBtn } from '../ui/button';
import classes from './item-carousel.module.css';
import { MdArrowBackIosNew, MdArrowForwardIos, MdKeyboardArrowRight } from 'react-icons/md';
import ItemCard from '../card/item-card';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from 'react';
import DUMMY_ITEMS from '../../dummy-item-data';

function ItemCarousel() {

    const carouselControl = useRef();

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        adaptiveHeight: true,
        variableWidth: true,
        swipeToSlide: true,
    };

    const nextCarouselHandler = () => {
        carouselControl.current.slickNext();
    }

    const prevCarouselHandler = () => {
        carouselControl.current.slickPrev();
    }

    console.log(DUMMY_ITEMS)

    return (
        <section>
            <div className={classes.header}>
                <div className={classes.title}>
                    <h2>Popular Product</h2>
                    <p>See all <MdKeyboardArrowRight /></p>
                </div>
                <div className={classes.ArrowBtn}>
                    <ArrowBtn onClick={prevCarouselHandler} ><MdArrowBackIosNew /></ArrowBtn>
                    <ArrowBtn onClick={nextCarouselHandler} ><MdArrowForwardIos /></ArrowBtn>
                </div>
            </div>
            <Slider ref={carouselControl} {...settings}>
                {DUMMY_ITEMS.map((item =>
                    <div className={classes.card}>
                        <ItemCard key={item.id} id={item.id} title={item.nama} cost={item.harga} />
                    </div>
                ))}

            </Slider>

        </section >
    )
}

export default ItemCarousel;