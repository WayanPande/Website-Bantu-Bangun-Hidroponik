import { Fragment } from "react";
import Home from "../components/layout/home";
import MainHeader from "../components/layout/main-header";



function HomePage() {

    return (
        <Fragment>
            <MainHeader />
            <Home />
        </Fragment>
    );
}

export default HomePage;