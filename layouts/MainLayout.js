import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

MainLayout.propTypes = {
    children: PropTypes.node
};

export default function MainLayout({
    children = null
}) {
    return (
        <>
            <Head>
                <title>Boxis.io</title>
            </Head>

            <header>
                <h1>Boxis.io</h1>
                <nav>
                    <Link href='/'><a>Главная</a></Link>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer>
                footer
            </footer>
        </>
    );
}