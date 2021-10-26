import { Fragment } from "react";
import Checkout from "../../components/layout/checkout";
import MainHeader from "../../components/layout/main-header";


function CartPage() {
    return (
        <Fragment>
            <MainHeader />
            <Checkout />

        </Fragment>
    )
}

export default CartPage;