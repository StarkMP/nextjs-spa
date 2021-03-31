import Head from 'next/head';
import Link from 'next/link';

export default function MainLayout(props) {
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
                {props.children}
            </main>

            <footer>
                footer
            </footer>
        </>
    );
}