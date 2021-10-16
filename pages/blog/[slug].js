import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Home from '../../components/layout/home';
import Modal from '../../components/ui/Modal';

function BlogDetail(props) {

    const router = useRouter();

    const filterData = router.query.slug;

    console.log(filterData)

    return (
        <Fragment>
            <Modal />
            <Home />
        </Fragment>
    )

}

export default BlogDetail;