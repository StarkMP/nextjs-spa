import { Fragment } from 'react';
import Head from 'next/head';

import Button from 'components/Button';
import { useUserContext } from 'context/user';

export default function PersonalLayout({
    children = null
}) {
    const { logout } = useUserContext();

    return (
        <Fragment>
            <Head>
                <title>Boxis.io</title>
            </Head>

            <header>
                <h1>Boxis.io</h1>
                <Button onClick={logout} className='btn-danger'>Выход</Button>
            </header>

            <main>
                {children}
            </main>

            <footer>
                footer
            </footer>
        </Fragment>
    );
}