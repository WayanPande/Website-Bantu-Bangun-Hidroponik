import { Fragment } from "react";
import MainHeader from "../../components/layout/main-header";
import Shop from "../../components/layout/shop";
import Head from 'next/head';


function ShopPage() {
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
            <Shop />
        </Fragment>
    )
}

export default ShopPage;