import { getSession } from "next-auth/client";
import { Fragment, useEffect } from "react";
import AdminLayout from "../../components/layout/admin";


function AdminPage() {

    return (
        <div style={{ background: '#F6F9FC', height: '100%' }}>
            <AdminLayout />
        </div>
    )
}

export default AdminPage;

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    } else if (session.user.name !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}