import { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

PersonalLayout.propTypes = {
    children: PropTypes.node
};

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