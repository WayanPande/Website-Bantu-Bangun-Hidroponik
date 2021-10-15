import { Fragment } from "react";
import CategoryCard from "../card/category-card";
import BlogCarousel from "../carousel/blog-carousel";
import ItemCarousel from "../carousel/item-carousel";
import classes from './home.module.css';
import Modal from '../ui/Modal';

function Home(props) {

    return (
        <Fragment>
            <Modal />
            <div className={classes.backdrop}></div>
            <div className={classes.container}>
                <section className={classes.firstRow}>
                    <CategoryCard />
                    <div className={classes.banner}>
                        <h2>Bantu Bangun Hidroponik</h2>
                        <p>website yang menyediakan informasi mengenai alat dan bahan untuk hidroponik serta tempat penjualan alat dan bahan untuk melakukan penanaman dengan cara hidroponik</p>
                    </div>
                </section>
                <ItemCarousel key='Popular Product' title='Popular Product' type='popular' />
                <ItemCarousel key='More than just low prices' title='More than just low prices' type='low-price' />
                <div className={classes.bannerFull}></div>
                <BlogCarousel />
            </div>
        </Fragment>
    );
}

export default Home;