import { Fragment } from "react";
import CategoryCard from "../card/category-card";
import ItemCarousel from "../carousel/item-carousel";
import classes from './home.module.css';

function Home(props) {
    return (
        <Fragment>
            <div className={classes.backdrop}></div>
            <div className={classes.container}>
                <section className={classes.firstRow}>
                    <CategoryCard />
                    <div className={classes.banner}>
                        <h2>Bantu Bangun Hidroponik</h2>
                        <p>website yang menyediakan informasi mengenai alat dan bahan untuk hidroponik serta tempat penjualan alat dan bahan untuk melakukan penanaman dengan cara hidroponik</p>
                    </div>
                </section>
                <ItemCarousel />
            </div>
        </Fragment>
    );
}

export default Home;