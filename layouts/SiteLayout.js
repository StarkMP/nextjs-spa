import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
            <div className='site__post' key={post.id}>
                <div className='site__post-inner' style={{ backgroundImage: `url(${post.img})` }}></div>
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

            <header className={`header fixed-top px-4 site-header ${scrolled ? 'bg-light' : ''}`}>
                <h2 className={`site-header__title ${scrolled ? 'text-dark' : 'text-white'}`}>{title}</h2>
                <button type="button" className={`btn btn-sm ${scrolled ? 'btn-outline-dark' : 'btn-outline-light'} px-3 site-header__contact-btn`}>Связаться</button>
            </header>

            <main className={`flex-shrink-0 site`}>
                <section className='site__background' style={{ backgroundImage: `url(${background})` }}>
                    <div className={`site__background-content container-sm`}>
                        <h1 className='fs-1'>{title}</h1>
                        <p className='fs-5'>{description}</p>
                    </div>
                </section>
                <div className={`container`}>
                    <section className='site__section'>
                        <h2 className='site__section-title'>Товары и услуги</h2>
                        <Carousel
                            items={mappedPosts}
                            divide={8}
                            id='posts'
                            theme='dark'
                        />
                    </section>
                </div>
            </main>

            <footer className='footer mt-auto py-2 bg-dark site-footer'>
                <div className='container text-white'>
                    Сделано в <Link href='/'><a className={`text-decoration-none site-footer__link`}>Boxis.io</a></Link>
                </div>
            </footer>
        </>
    );
}