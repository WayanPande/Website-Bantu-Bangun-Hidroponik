import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import Checkout from "../../components/layout/checkout";
import MainHeader from "../../components/layout/main-header";
import { getAllItems } from "../../store/product-actions";
import Head from 'next/head';
import { useSession } from "next-auth/client";

function CartPage() {

    const dispatch = useDispatch();
    const [session, loading] = useSession();

    useEffect(() => {
        if (!session) {
            window.location.href = '/auth/login'
        }
        dispatch(getAllItems());

    }, [dispatch]);

    return (
        <Fragment>
            <Head>
                <title>BBH • Cart</title>
            </Head>
            <MainHeader />
            <Checkout />

        </Fragment>
    )
}

export default CartPage;