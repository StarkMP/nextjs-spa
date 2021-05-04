import { Fragment } from 'react';
import Head from 'next/head';

import Button from 'components/Button';
import UserAccess from 'classes/UserAccess';

export default function PersonalLayout({
    children = null
}) {
    return (
        <Fragment>
            <Head>
                <title>Boxis.io</title>
            </Head>

            <header>
                <h1>Boxis.io</h1>
                <Button onClick={() => UserAccess.logout()} className='btn-danger'>Выход</Button>
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