import Head from 'next/head';
import { useEffect, useState } from 'react';

import DefaultLink from 'components/DefaultLink';
import colors from 'styles/utils/colors.module.scss';
import styles from 'styles/components/SiteLayout.module.scss';
import Carousel from 'components/Carousel';

export default function SiteLayout(props) {
    const [scrolled, setScrolled] = useState(false);

    const {
        title,
        background,
        description
    } = props.details;

    const mappedPosts = props.posts.map(post => {
        return (
            <div key={post.id}>
                {post.title}
            </div>
        );
    });

    const onScroll = () => {
        if (pageYOffset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        const $document = $(document);

        $document.on('scroll', onScroll);

        return () => {
            $document.off('scroll', onScroll);
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <header className={`header fixed-top px-4 ${styles.header} ${scrolled ? 'bg-light' : ''}`}>
                <h2 className={`${styles.title} ${scrolled ? 'text-dark' : 'text-white'}`}>{title}</h2>
                <button type="button" className={`btn btn-sm ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'} px-3 ${styles.btn}`}>Связаться</button>
            </header>

            <main className={`flex-shrink-0 ${styles.main}`}>
                <section className={styles.background} style={{ backgroundImage: `url(${background})` }}>
                    <div className={`${styles.topContent} container-sm`}>
                        <h1 className='fs-1'>{title}</h1>
                        <p className='fs-5'>{description}</p>
                    </div>
                </section>
                <div className={`container`}>
                    <section className={`${styles.section}`}>
                        <h2>Товары и услуги</h2>
                        <Carousel
                            items={mappedPosts}
                            divide={6}
                            id='posts'
                            className={styles.carousel}
                        />
                    </section>
                </div>
            </main>

            <footer className='footer mt-auto py-2 bg-dark'>
                <div className='container text-white'>
                    Сделано в <DefaultLink className={`text-decoration-none ${colors.link}`} href='/'>Boxis.io</DefaultLink>
                </div>
            </footer>
        </>
    );
}