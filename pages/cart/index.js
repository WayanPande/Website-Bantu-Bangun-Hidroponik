import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import Checkout from "../../components/layout/checkout";
import MainHeader from "../../components/layout/main-header";
import { getAllItems } from "../../store/product-actions";
import Head from 'next/head';
import { getSession } from "next-auth/client";

function CartPage() {

    const dispatch = useDispatch();

    useEffect(() => {
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

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}