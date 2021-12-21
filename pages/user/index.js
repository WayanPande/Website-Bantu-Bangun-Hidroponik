import { Fragment } from "react";
import MainHeader from "../../components/layout/main-header";
import Head from 'next/head';
import User from "../../components/layout/user";
import { getSession, useSession } from "next-auth/client";

function UserPage() {

    const [session, loading] = useSession();

    return (
        <Fragment>
            <Head>
                <title>BBH • {session ? session.user.name : 'User'}</title>
            </Head>
            <MainHeader />
            <User />
        </Fragment>
    )
}

export default UserPage;

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