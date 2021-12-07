import { Fragment, useEffect, useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";
import ProductDetail from "../../components/layout/productDetail";
import MainHeader from "../../components/layout/main-header";


function ProductDetailPage() {

    const router = useRouter();
    const [slug, setSlug] = useState('');

    useEffect(() => {
        if (!router.isReady) return;
        setSlug(router.query.slug);
    }, [router.isReady, router.query.slug]);

    return (
        <Fragment>
            <Head>
                <title>BBH • Shop</title>
                <meta
                    name='description'
                    content='Temukan peralatan untuk menunjang pertanian hidroponikmu...'
                />
            </Head>
            <MainHeader />
            <ProductDetail slug={slug} />
        </Fragment>
    )
}

export default ProductDetailPage;