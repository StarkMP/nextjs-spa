import Head from 'next/head';

import DefaultLink from 'components/DefaultLink';

export default function MainLayout(props) {
    return (
        <>
            <Head>
                <title>Boxis.io</title>
            </Head>

            <header>
                <h1>Boxis.io</h1>
                <nav>
                    <DefaultLink href='/'>Главная</DefaultLink>
                </nav>
            </header>

            <main>
                {props.children}
            </main>

            <footer>
                footer
            </footer>
        </>
    );
}