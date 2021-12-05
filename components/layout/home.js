import { Fragment, useEffect } from "react";
import CategoryCard from "../card/category-card";
import BlogCarousel from "../carousel/blog-carousel";
import ItemCarousel from "../carousel/item-carousel";
import classes from './home.module.css';
import Modal from '../ui/Modal';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import Image from 'next/image';

function Home(props) {

    const router = useRouter();
    const slug = useSelector(state => state.modal.slug);
    const showedModal = useSelector(state => state.modal.showModal);
    const [session, loading] = useSession();


    useEffect(() => {
        // console.log(router.query)
        if (router.query.blog) {
            router.push('/?blog=' + router.query.blog, undefined, { shallow: true });
        }
    }, []);

    useEffect(() => {
        if (slug !== '') {
            router.push('/?blog=' + slug, '/blog?s=' + slug, { shallow: true });
        } else {
            router.push('/', undefined, { shallow: true });
        }

    }, [slug]);


    return (
        <Fragment>
            {showedModal && <Modal />}
            <div className={classes.backdrop}></div>
            <div className={classes.container}>
                <section className={classes.firstRow}>
                    <CategoryCard />
                    <div className={classes.banner}>
                        <div className={classes.bannerFullImg}>
                            <Image src={'/images/Banner-1.png'} alt='BBH Banner' layout='fill' priority />
                        </div>
                    </div>
                </section>
                <ItemCarousel key='Popular Product' title='Popular Product' type='popular' />
                <ItemCarousel key='More than just low prices' title='More than just low prices' type='low-price' />
                <div className={classes.bannerFull}>
                    <div className={classes.bannerFullImg}>
                        <Image src={'/images/Banner-2.png'} alt='BBH Banner' layout='fill' />
                    </div>
                </div>
                <BlogCarousel />
            </div>
        </Fragment>
    );
}

export default Home;