import { Fragment } from "react";
import Home from "../components/layout/home";
import MainHeader from "../components/layout/main-header";
import Head from 'next/head';


function HomePage() {

    return (
        <Fragment>
            <Head>
                <title>BBH | Home</title>
                <meta
                    name='description'
                    content='Temukan peralatan untuk menunjang pertanian hidroponikmu...'
                />
            </Head>
            <MainHeader />
            <Home />
        </Fragment>
    );
}

export default HomePage;